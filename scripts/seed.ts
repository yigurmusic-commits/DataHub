import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import ws from 'ws';

dotenv.config();

let GEMINI_API_KEY = process.env.VITE_API_KEY || process.env.GEMINI_API_KEY || '';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!GEMINI_API_KEY) {
  console.error('Error: VITE_API_KEY or GEMINI_API_KEY is not defined in environment variables.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const isSupabaseConfigured =
  SUPABASE_URL &&
  SUPABASE_URL !== 'https://your-project.supabase.co' &&
  SUPABASE_ANON_KEY &&
  SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here';

const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      realtime: { transport: ws as any }
    })
  : null;

// Helper to sanitize JSON response from Gemini
function sanitizeJson(text: string): string {
  return text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
}

// Sleep helper
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry with exponential backoff for rate limit errors
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 4, label = ''): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e: any) {
      const status = e?.status || e?.code;
      const isRateLimit = status === 429 || status === 503;
      if (isRateLimit && attempt < maxRetries) {
        const delay = Math.pow(2, attempt + 3) * 1000; // 8s, 16s, 32s, 64s
        console.log(`  [Rate limit] ${label} — waiting ${delay / 1000}s before retry (attempt ${attempt + 1}/${maxRetries})...`);
        await sleep(delay);
      } else {
        throw e;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

async function getUniversityList() {
  console.log('Fetching list of all Kazakhstan universities from Gemini...');
  const prompt = `
    Сгенерируй полный список всех высших учебных заведений (вузов) Республики Казахстан.
    Включи как крупные национальные и государственные университеты, так и региональные, профильные и частные вузы (всего должно быть порядка 100-120 вузов).
    
    Верни ответ СТРОГО в формате JSON без разметки markdown.
    Формат JSON:
    [
      {
        "id": "уникальный id на английском (например, 'nu', 'kbtu', 'kaznu', 'sdu')",
        "name": "Полное название университета (например, 'Казахский национальный университет имени аль-Фараби')",
        "shortName": "Аббревиатура (например, 'КазНУ')",
        "location": "Город (например, 'Алматы')",
        "category": "Категория: 'National' (Национальный), 'State' (Государственный), 'Private' (Частный), 'Medical' (Медицинский) или 'Specialized' (Профильный)"
      }
    ]
  `;

  const response = await withRetry(() => ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  }), 3, 'getUniversityList');

  const rawText = response.text || '[]';
  const cleanJson = sanitizeJson(rawText);
  return JSON.parse(cleanJson);
}

async function generateUniversityDetails(uni: any) {
  console.log(`  Generating: ${uni.shortName} (${uni.location})...`);
  const prompt = `
    Ты — эксперт по высшему образованию в Казахстане. Сгенерируй детальные сведения и список основных образовательных программ для следующего вуза:
    Название: ${uni.name}
    Аббревиатура: ${uni.shortName}
    Город: ${uni.location}
    Категория: ${uni.category}

    Верни ответ СТРОГО в формате JSON без разметки markdown.
    Формат JSON:
    {
      "description": "Краткое описание вуза (2-3 предложения на русском языке)",
      "founded": 1990,
      "ranking": 10,
      "students": 5000,
      "tuitionAvg": "от 600 000 ₸",
      "mission": "Миссия университета (1 предложение)",
      "partners": ["Партнер 1", "Партнер 2"],
      "admissionDeadlines": "25.08",
      "tourUrl": "",
      "achievements": ["Достижение 1", "Достижение 2"],
      "admissionRequirements": ["Требование 1", "Требование 2"],
      "admissionProcedure": ["Шаг 1", "Шаг 2"],
      "scholarships": ["Грант 1", "Скидка 2"],
      "dormitory": true,
      "militaryDept": true,
      "contacts": {
        "website": "https://example.edu.kz",
        "phone": "+7 (7XX) XXX XX XX",
        "email": "info@example.edu.kz",
        "address": "Адрес главного корпуса"
      },
      "doubleDegree": [
        {
          "partner": "Зарубежный вуз-партнер",
          "program": "Направление обучения",
          "country": "Код страны (например, 'DE')"
        }
      ],
      "programs": [
        {
          "name": "Название программы",
          "degree": "Bachelor",
          "duration": "4 года",
          "language": "KZ/RU",
          "description": "Краткое описание программы",
          "tuition": "600 000 ₸"
        }
      ]
    }
  `;

  try {
    const response = await withRetry(() => ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    }), 4, uni.shortName);

    const rawText = response.text || '{}';
    const cleanJson = sanitizeJson(rawText);
    const details = JSON.parse(cleanJson);
    return { ...uni, ...details };
  } catch (e) {
    console.error(`  [SKIP] Failed for ${uni.shortName}:`, (e as any)?.message?.slice(0, 80));
    return {
      ...uni,
      description: `Университет ${uni.name} в городе ${uni.location}.`,
      founded: 2000,
      ranking: 50,
      students: 2000,
      tuitionAvg: 'от 500 000 ₸',
      mission: 'Качественное высшее образование.',
      partners: [],
      admissionDeadlines: '25.08',
      achievements: [],
      admissionRequirements: ['Аттестат о среднем образовании', 'Сертификат ЕНТ'],
      admissionProcedure: ['Подача документов', 'Зачисление'],
      scholarships: ['Государственный образовательный грант'],
      dormitory: false,
      militaryDept: false,
      contacts: { website: '', phone: '', email: '', address: uni.location },
      doubleDegree: [],
      programs: []
    };
  }
}

async function uploadToSupabase(detailedUniversities: any[]) {
  if (!supabase) {
    console.log('Supabase not configured — skipping cloud upload.');
    return;
  }

  console.log(`\nUploading ${detailedUniversities.length} universities to Supabase...`);
  let successCount = 0;

  for (const uni of detailedUniversities) {
    const { programs, ...uniData } = uni;

    const dbUni = {
      id: uniData.id,
      name: uniData.name,
      short_name: uniData.shortName,
      location: uniData.location,
      description: uniData.description,
      founded: uniData.founded,
      ranking: uniData.ranking,
      students: uniData.students,
      tuition_avg: uniData.tuitionAvg,
      image: uniData.image || `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800`,
      logo: uniData.logo || uniData.shortName,
      mission: uniData.mission,
      partners: uniData.partners || [],
      admission_deadlines: uniData.admissionDeadlines,
      category: uniData.category,
      tour_url: uniData.tourUrl || '',
      achievements: uniData.achievements || [],
      admission_requirements: uniData.admissionRequirements || [],
      admission_procedure: uniData.admissionProcedure || [],
      scholarships: uniData.scholarships || [],
      dormitory: uniData.dormitory ?? false,
      military_dept: uniData.militaryDept ?? false,
      contacts: uniData.contacts || {},
      double_degree: uniData.doubleDegree || []
    };

    const { error: uniError } = await supabase
      .from('universities')
      .upsert(dbUni, { onConflict: 'id' });

    if (uniError) {
      console.error(`  [DB ERROR] ${uni.shortName}:`, uniError.message);
      continue;
    }

    // Upload programs
    if (programs && programs.length > 0) {
      await supabase.from('programs').delete().eq('university_id', uni.id);
      const dbPrograms = programs.map((p: any) => ({
        university_id: uni.id,
        name: p.name,
        degree: p.degree,
        duration: p.duration,
        language: p.language,
        description: p.description,
        tuition: p.tuition
      }));
      const { error: progError } = await supabase.from('programs').insert(dbPrograms);
      if (progError) {
        console.error(`  [PROG ERROR] ${uni.shortName}:`, progError.message);
      }
    }

    successCount++;
    process.stdout.write(`\r  Uploaded: ${successCount}/${detailedUniversities.length}`);
  }

  console.log(`\n✅ Supabase sync complete! ${successCount} universities uploaded.`);
}

async function run() {
  try {
    // Step 1: Get the list of all universities
    const list = await getUniversityList();
    console.log(`✅ Found ${list.length} universities.\n`);

    // Step 2: Generate details ONE BY ONE with 13s delay to respect 5 req/min limit
    // Free tier = 5 requests/minute. Processing 1 at a time with 13s gap = ~4.6 req/min safely.
    const detailedUniversities: any[] = [];
    const DELAY_MS = 13000; // 13 seconds between requests

    for (let i = 0; i < list.length; i++) {
      const uni = list[i];
      console.log(`[${i + 1}/${list.length}]`);
      const detailed = await generateUniversityDetails(uni);
      detailedUniversities.push(detailed);

      // Save progress after every 10 universities
      if ((i + 1) % 10 === 0 || i === list.length - 1) {
        const progressPath = path.join(process.cwd(), 'db_seed_progress.json');
        fs.writeFileSync(progressPath, JSON.stringify(detailedUniversities, null, 2), 'utf-8');
        console.log(`  💾 Progress saved (${detailedUniversities.length} universities).`);
      }

      // Wait between requests (skip wait after last item)
      if (i < list.length - 1) {
        await sleep(DELAY_MS);
      }
    }

    // Step 3: Save final local backup
    const localFilePath = path.join(process.cwd(), 'db_seed.json');
    fs.writeFileSync(localFilePath, JSON.stringify(detailedUniversities, null, 2), 'utf-8');
    console.log(`\n✅ Saved full local backup: ${localFilePath}`);

    // Step 4: Upload to Supabase
    await uploadToSupabase(detailedUniversities);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

run();
