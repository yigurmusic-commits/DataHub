
import { GoogleGenAI, Content } from "@google/genai";
import { UNIVERSITIES } from "../constants";
import { University, UserProfile, StudentProfile } from "../types";

// Initialize Gemini
// Use Vite environment variables safely in browser
const API_KEY = (import.meta as any).env?.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
Ты — профессиональный консультант по поступлению в вузы Казахстана "DataHub Advisor".
Твоя главная цель: Помочь абитуриенту найти идеальный вуз и оценить шансы на грант.

Твои знания:
1.  **База данных**: Ты имеешь доступ к списку вузов: ${JSON.stringify(UNIVERSITIES.map(u => ({ 
      id: u.id, name: u.name, short: u.shortName, loc: u.location, 
      programs: u.programs.map(p => p.name).join(', '), 
      fee: u.tuitionAvg, rank: u.ranking, cat: u.category 
    })))}.
2.  **ЕНТ (Единое Национальное Тестирование)**:
    - Максимальный балл: 140. Проходной в нац. вузы ~65, в остальные ~50. Медицина ~70.
    - Гранты: >110 баллов — высокие шансы на IT/Юриспруденцию/Медицину. 90-100 — средние шансы.

Стиль общения: Дружелюбный, экспертный, поддерживающий, на языке пользователя (KZ/RU). Используй эмодзи 🎓, 🇰🇿, 📚.
`;

const modelId = 'gemini-2.5-flash';

export const sendMessageToGemini = async (
  message: string,
  history: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> => {
  try {
    const contents: Content[] = [
      ...history.slice(-10).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user' as const,
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Извините, я не смог сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к AI сервису. Пожалуйста, проверьте API ключ.";
  }
};

export const compareUniversitiesWithAI = async (universities: University[], lang: string) => {
  try {
    const uniData = universities.map(u => ({
      id: u.id,
      name: u.name,
      short: u.shortName,
      location: u.location,
      ranking: u.ranking,
      tuition: u.tuitionAvg,
      programs: u.programs.slice(0, 5).map(p => p.name).join(', '),
      description: u.description
    }));

    // Construct the prompt to ask for JSON
    const prompt = `
      Сравни следующие университеты (IDs: ${universities.map(u => u.id).join(', ')}).
      Язык ответа: ${lang === 'kz' ? 'Казахский' : (lang === 'en' ? 'Английский' : 'Русский')}.
      
      Данные: ${JSON.stringify(uniData)}

      Верни ответ СТРОГО в формате JSON без markdown форматирования.
      Структура JSON:
      {
        "summary": "Краткое общее резюме сравнения (1-2 предложения)",
        "verdict": "Итоговый совет: кому что выбрать",
        "table": [
           {
             "criteria": "Название критерия (например: Репутация, Локация, Сложность поступления)",
             "values": {
               "${universities[0].id}": "Краткая оценка вуза 1",
               "${universities[1]?.id || 'uni2'}": "Краткая оценка вуза 2"
               ... для всех вузов
             }
           }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Comparison Error:", error);
    return null;
  }
}

export const analyzeProfileWithAI = async (profile: UserProfile, lang: string) => {
  try {
    const prompt = `
      Я абитуриент. Мой профиль:
      - Балл ЕНТ: ${profile.score} (Макс 140)
      - Профильные предметы: ${profile.subjectPair}
      - Предпочтительный город: ${profile.city}
      - Интересы: ${profile.interests.join(', ')}

      Задача: Подбери 3-4 университета из списка (IDs: ${UNIVERSITIES.map(u => u.id).join(', ')}), которые ИДЕАЛЬНО подходят для поступления.
      
      Язык ответа: ${lang === 'kz' ? 'Казахский' : (lang === 'en' ? 'Английский' : 'Русский')}.

      Верни ответ СТРОГО в формате JSON.
      Структура JSON:
      {
        "recommendations": [
          {
            "uniId": "id вуза (например 'nu' или 'kbtu')",
            "programName": "Конкретная образовательная программа",
            "matchPercentage": 95, 
            "grantChance": 85, (число от 0 до 100)
            "employmentChance": 92, (число от 0 до 100)
            "salaryForecast": "450 000 ₸", (прогноз зарплаты)
            "reason": "Почему этот вуз? (1-2 предложения)",
            "risk": "Особенность или сложность (1 предложение)"
          }
        ],
        "twinProfile": {
           "academicLevel": "Оценка уровня (Высокий/Средний/Начальный)",
           "strengths": ["Сильная сторона 1", "Сильная сторона 2"],
           "weaknesses": ["Зона роста 1", "Зона роста 2"],
           "learningStyle": "Стиль обучения"
        },
        "twinStats": {
           "foundCount": 850, (количество похожих абитуриентов в базе - выдумай реалистичное число)
           "avgScore": 95, (средний балл похожих абитуриентов)
           "successRate": "Текст об успехе (например: 87% поступили на грант)",
           "similarInterests": ["интерес 1", "интерес 2"]
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION, 
        responseMimeType: 'application/json'
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Guidance Error:", error);
    return null;
  }
};

// --- NEW FUNCTION: Analyze Comprehensive Student Profile ---
export const analyzeStudentPortfolio = async (student: StudentProfile, lang: string) => {
  try {
    const portfolioDesc = student.portfolio.map(p => `${p.category}: ${p.title} (${p.issuer}, ${p.date})`).join('; ');
    const targetUniNames = UNIVERSITIES.filter(u => student.targetUniversities.includes(u.id)).map(u => u.name).join(', ');

    const prompt = `
      Проанализируй полный профиль абитуриента для поступления в вузы Казахстана и зарубежья.
      
      Данные абитуриента:
      - Имя: ${student.name}
      - Класс: ${student.grade}, GPA: ${student.gpa}/5.0
      - ЕНТ/Тесты: ${student.score} баллов, предметы: ${student.subjectPair}
      - Интересы: ${student.interests.join(', ')}
      - Целевые вузы: ${targetUniNames || "Не выбраны"}
      - Портфолио/Достижения: ${portfolioDesc || "Нет загруженных достижений"}
      - Био: ${student.bio || "Не указано"}

      Задачи ИИ:
      1. Оцени силу профиля (0-100).
      2. Gap Analysis: Чего не хватает для поступления в топовые вузы (NU, KBTU, SDU и т.д.)?
      3. План действий (Roadmap).
      4. Идеи для эссе (Motivation Letter).

      Язык ответа: ${lang === 'kz' ? 'Казахский' : (lang === 'en' ? 'Английский' : 'Русский')}.

      Верни ответ СТРОГО в формате JSON:
      {
        "overallScore": 75, (число 0-100)
        "summary": "Краткий анализ профиля (2-3 предложения)",
        "gapAnalysis": [
           { "target": "Общая конкурентоспособность или конкретный вуз", "missing": ["Текст 1", "Текст 2"] }
        ],
        "roadmap": [
           { "period": "Ближайший месяц", "action": "Действие", "impact": "High" (или Medium) }
        ],
        "essayTopics": ["Тема 1", "Тема 2", "Тема 3"]
      }
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "Ты — эксперт приемной комиссии уровня Ivy League и NU. Будь строгим, но конструктивным.",
        responseMimeType: 'application/json'
      }
    });

    return response.text;
  } catch (error) {
    console.error("Portfolio Analysis Error:", error);
    return null;
  }
};
