
import { University, Profession } from './types';

// Educational logo (Graduation Cap) as SVG data URI
export const LOGO_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 10v6M2 10l10-5 10 5-10 5z'/%3E%3Cpath d='M6 12v5c3 3 9 3 12 0v-5'/%3E%3C/svg%3E";

// Default values for universities that don't have specific data overrides
const DEFAULTS = {
  requirements: [
    "Аттестат о среднем образовании (оригинал)",
    "Сертификат ЕНТ (минимальный балл: 50, Медицина: 70)",
    "Удостоверение личности (копия)",
    "Медицинская справка форма 075/у",
    "6 фотографий размером 3х4"
  ],
  procedure: [
    "Регистрация в базе абитуриентов вуза (онлайн/офлайн).",
    "Сдача документов в приемную комиссию.",
    "Подача заявления на конкурс государственных грантов (через eGov, июль).",
    "Заключение договора на платное отделение (если без гранта).",
    "Зачисление и оплата (август)."
  ],
  scholarships: [
    "Государственный образовательный грант (полное покрытие + стипендия ~41 000 ₸)",
    "Повышенная стипендия (для отличников +15%)",
    "Президентская стипендия (за особые заслуги)",
    "Гранты ректора (внутренние)",
    "Скидки для социально уязвимых категорий"
  ],
  achievements: [
    "Высокий уровень трудоустройства выпускников",
    "Аккредитация независимых агентств (IQAA, IAAR)",
    "Сотрудничество с ведущими предприятиями региона"
  ]
};

export const UNIVERSITIES: University[] = [
  // --- АСТАНА ---
  {
    id: 'nu',
    name: 'Nazarbayev University',
    shortName: 'NU',
    location: 'Астана',
    description: 'Флагман высшего образования Казахстана. Nazarbayev University — это современный исследовательский университет международного уровня. Обучение ведется полностью на английском языке по принципам академической честности и меритократии.',
    founded: 2010,
    ranking: 1,
    students: 6500,
    tuitionAvg: 'от 5 000 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg/800px-Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gumilyov_Eurasian_National_University.jpg/800px-Gumilyov_Eurasian_National_University.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/L.N._Gumilyov_Eurasian_National_University_Main_Building.jpg/800px-L.N._Gumilyov_Eurasian_National_University_Main_Building.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/ENU_main_building.jpg/800px-ENU_main_building.jpg'
    ],
    logo: 'ENU',
    mission: 'Генерация знаний и подготовка конкурентоспособных кадров для устойчивого развития Евразии.',
    programs: [
      { name: 'Международные отношения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Архитектура', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' }
    ],
    partners: ['RUDN', 'Warsaw Univ', 'MGU'],
    doubleDegree: [
      { partner: 'РУДН (Россия)', program: 'Международное право', country: 'RU' },
      { partner: 'Warsaw University', program: 'International Relations', country: 'PL' }
    ],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: ["QS World Ranking Top 350", "Лидер по количеству грантов в РК", "QS Stars - 4 звезды"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://enu.kz',
        phone: '+7 (7172) 70 95 00',
        email: 'enu@enu.kz',
        address: 'г. Астана, ул. Сатпаева, 2'
    }
  },
  {
    id: 'kazatu',
    name: 'Казахский агротехнический исследовательский университет им. С. Сейфуллина',
    shortName: 'КазАТИУ',
    location: 'Астана',
    description: 'Крупнейший аграрный вуз Центрального Казахстана со статусом исследовательского университета. Лидер в области сельскохозяйственных наук, ветеринарии и биотехнологий.',
    founded: 1957,
    ranking: 12,
    students: 12000,
    tuitionAvg: '800 000 – 950 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/KazATU_main_building.jpg/800px-KazATU_main_building.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'AITU',
    mission: 'Подготовка цифровой элиты для трансформации экономики Казахстана.',
    programs: [
      { name: 'Software Engineering', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Разработка ПО, архитектура систем, DevOps.' },
      { name: 'Big Data Analysis', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Анализ данных, ML и AI.' },
      { name: 'Cybersecurity', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Защита информации и сетевая безопасность.' }
    ],
    partners: ['Cisco', 'Huawei', 'Kaspersky', '1C'],
    admissionDeadlines: '10.08',
    category: 'Private',
    achievements: ["Лучший IT вуз по версии работодателей 2023", "Расположение в EXPO центре", "Программы за 3 года (интенсив)"],
    admissionRequirements: ["ЕНТ (проф. предметы: Информатика)", "IELTS не требуется (но приветствуется)", "Собеседование (опционально)"],
    admissionProcedure: [
      "Сдача ЕНТ (Мат + Информатика)",
      "Подача на целевой грант AITU (внутренний конкурс)",
      "Подача на гос. грант",
      "Заключение договора"
    ],
    scholarships: ["Государственные гранты", "Внутренние гранты AITU Partners", "Скидки за призовые места в олимпиадах"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://astanait.edu.kz',
        phone: '+7 (7172) 64 57 10',
        email: 'info@astanait.edu.kz',
        address: 'г. Астана, пр. Мангилик Ел, С1.1 (EXPO)'
    }
  },
  {
    id: 'mua',
    name: 'Медицинский университет Астана',
    shortName: 'МУА',
    location: 'Астана',
    description: 'Ведущий медицинский вуз столицы, тесно сотрудничающий с Национальным медицинским холдингом. Клиническая практика проходит в передовых клиниках города.',
    founded: 1964,
    ranking: 19,
    students: 8000,
    tuitionAvg: '1 100 000 – 1 400 000 ₸',
    image: 'https://amu.edu.kz/upload/iblock/c53/c538b7d413e15779ecdfa2db7243c7b3.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'KAZGUU',
    mission: 'Служение правосудию и обществу через качественное образование.',
    programs: [
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Международное право', degree: 'Bachelor', duration: '4 года', language: 'EN' },
      { name: 'Финансы (ACCA)', degree: 'Bachelor', duration: '4 года', language: 'EN' }
    ],
    partners: ['HSE Moscow', 'Oxford (partners)', 'Penn State'],
    doubleDegree: [
       { partner: 'Hof University', program: 'Business Administration', country: 'DE' },
       { partner: 'Solbridge School', program: 'International Business', country: 'KR' }
    ],
    admissionDeadlines: '20.08',
    category: 'Private',
    achievements: ["ACCA аккредитация", "FIBAA аккредитация", "Лучшая школа права в СНГ"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["KAZGUU Endowment", "Гранты ректора", "Корпоративные стипендии"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kazguu.kz',
        phone: '+7 (7172) 70 30 30',
        email: 'info@kazguu.kz',
        address: 'г. Астана, шоссе Коргалжын, 8'
    }
  },

  // --- АЛМАТЫ ---
  {
    id: 'kaznu',
    name: 'Казахский Национальный Университет им. аль-Фараби',
    shortName: 'КазНУ',
    location: 'Алматы',
    description: 'Старейший и крупнейший классический университет страны. Обладает огромным кампусом "Казгуград" в предгорьях Заилийского Алатау. Лидер по количеству научных публикаций.',
    founded: 1934,
    ranking: 2,
    students: 25000,
    tuitionAvg: '1 200 000 – 1 600 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Al-Farabi_Kazakh_National_University.jpg/800px-Al-Farabi_Kazakh_National_University.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'SU',
    mission: 'Научное и инженерное обеспечение промышленного развития Казахстана.',
    programs: [
      { name: 'Нефтяная инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Робототехника и мехатроника', degree: 'Bachelor', duration: '4 года', language: 'EN' },
      { name: 'Геология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['Colorado School of Mines', 'Penn State'],
    doubleDegree: [
      { partner: 'City, University of London', program: 'Project Management', country: 'UK' },
      { partner: 'Hof University', program: 'Computer Science', country: 'DE' }
    ],
    admissionDeadlines: '15.08',
    category: 'National',
    achievements: ["Статус исследовательского университета", "Лидер по патентам", "Сотрудничество с Казатомпром"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://satbayev.university',
        phone: '+7 (727) 292 60 25',
        email: 'info@satbayev.university',
        address: 'г. Алматы, ул. Сатпаева, 22'
    }
  },
  {
    id: 'kbtu',
    name: 'Казахстанско-Британский технический университет',
    shortName: 'КБТУ',
    location: 'Алматы',
    description: 'Элитный технический вуз. Лучшие кадры для IT и нефтегазового сектора. Обучение ведется на английском языке. Тесная связь с индустрией (КМГ, Тенгизшевройл).',
    founded: 2001,
    ranking: 6,
    students: 4000,
    tuitionAvg: '2 400 000 – 3 600 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/KBTU_Building_Almaty.jpg/800px-KBTU_Building_Almaty.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/KIMEP_University_campus.jpg/800px-KIMEP_University_campus.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/KIMEP_New_Academic_Building.jpg/800px-KIMEP_New_Academic_Building.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/KIMEP_library.jpg/800px-KIMEP_library.jpg'
    ],
    logo: 'KIMEP',
    mission: 'Воспитание образованных граждан и улучшение качества жизни в Казахстане.',
    programs: [
      { name: 'Accounting and Audit', degree: 'Bachelor', duration: '4 года', language: 'English' },
      { name: 'Marketing', degree: 'Bachelor', duration: '4 года', language: 'English' },
      { name: 'International Relations', degree: 'Bachelor', duration: '4 года', language: 'English' }
    ],
    partners: ['Yonsei', 'Humboldt Univ', 'Glasgow Univ'],
    doubleDegree: [
      { partner: 'Cass Business School', program: 'Marketing', country: 'UK' },
      { partner: 'IÉSEG School of Management', program: 'Management', country: 'FR' }
    ],
    admissionDeadlines: '15.07',
    category: 'Private',
    achievements: ["Лидер бизнес-образования", "Высочайшие зарплаты выпускников в консалтинге", "Аккредитации всех программ"],
    admissionRequirements: ["IELTS 6.0+", "Аттестат", "Внутренний тест KEPT (если нет IELTS)"],
    admissionProcedure: ["Онлайн заявка", "Тестирование KEPT (опционально)", "Интервью"],
    scholarships: ["Гранты президента КИМЭП (100%)", "Need-based financial aid", "Merit-based scholarships"],
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://kimep.kz',
        phone: '+7 (727) 270 42 13',
        email: 'uao@kimep.kz',
        address: 'г. Алматы, пр. Абая, 2'
    }
  },
  {
    id: 'iitu',
    name: 'Международный университет информационных технологий',
    shortName: 'MUIT',
    location: 'Алматы',
    description: 'Первый специализированный IT-университет в Центральной Азии. Сильная база программирования и кибербезопасности. Активно участвует в чемпионатах по спортивному программированию.',
    founded: 2009,
    ranking: 9,
    students: 5000,
    tuitionAvg: '1 800 000 ₸',
    image: 'https://iitu.edu.kz/media/images/IITU_1.original.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Narxoz',
    mission: 'Вдохновлять на обучение и исследования для устойчивого будущего.',
    programs: [
      { name: 'Экономика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Финансы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Маркетинг', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' }
    ],
    partners: ['Coventry Univ', 'Penn State'],
    doubleDegree: [
       { partner: 'Coventry University', program: 'Global Business Management', country: 'UK' },
       { partner: 'La Rochelle', program: 'Tourism', country: 'FR' }
    ],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: ["FIBAA аккредитация", "QS Stars - 4 звезды", "Лучший 'Зеленый кампус'"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["Гранты Нархоза", "Стипендия Булата Утемуратова", "Скидки за IELTS"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://narxoz.kz',
        phone: '+7 (727) 377 11 11',
        email: 'info@narxoz.kz',
        address: 'г. Алматы, ул. Жандосова, 55'
    }
  },
  {
    id: 'almau',
    name: 'Almaty Management University',
    shortName: 'AlmaU',
    location: 'Алматы',
    description: 'Первый предпринимательский вуз Казахстана. Лидер бизнес-образования (MBA, DBA). Фокус на развитии предпринимательского мышления и мягких навыков.',
    founded: 1988,
    ranking: 14,
    students: 4500,
    tuitionAvg: '1 900 000 – 2 200 000 ₸',
    image: 'https://alma.edu.kz/wp-content/uploads/2023/10/alma-u-building.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Turan',
    mission: 'Создавать возможности для успеха каждого.',
    programs: [
      { name: 'Режиссура', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Туризм', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Психология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['MSU', 'University of Applied Sciences Europe'],
    admissionDeadlines: '25.08',
    category: 'Private',
    tourUrl: 'https://turan.edu.kz/ru/3dtour/',
    achievements: ["Собственная киностудия", "Apple Training Center", "Лидер в туризме"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["Гранты ректора Туран", "Скидки 'Алтын Белгі'"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://turan.edu.kz',
        phone: '+7 (727) 260 40 00',
        email: 'info@turan.edu.kz',
        address: 'г. Алматы, ул. Сатпаева, 16А'
    }
  },
  {
    id: 'aupet',
    name: 'Алматинский университет энергетики и связи им. Г. Даукеева',
    shortName: 'АУЭС',
    location: 'Алматы',
    description: 'Главный вуз энергетиков, связистов и IT-специалистов в области телекоммуникаций. Сложное, но качественное техническое образование. Выпускники востребованы в KEGOC, Казахтелеком.',
    founded: 1975,
    ranking: 16,
    students: 8000,
    tuitionAvg: '950 000 – 1 200 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ATU',
    mission: 'Технологии качества жизни.',
    programs: [
      { name: 'Технология продовольственных продуктов', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Дизайн одежды', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Ресторанное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['Institut Paul Bocuse'],
    admissionDeadlines: '20.08',
    category: 'State',
    achievements: ["Собственные производственные цеха", "Международные стажировки для технологов"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://atu.edu.kz',
        phone: '+7 (727) 293 52 96',
        email: 'info@atu.edu.kz',
        address: 'г. Алматы, ул. Толе би, 100'
    }
  },
  {
    id: 'kazgasa',
    name: 'КазГАСА (Каз. головная арх.-строит. академия)',
    shortName: 'KazGASA',
    location: 'Алматы',
    description: 'Главный архитектурно-строительный вуз Казахстана. Творческая и инженерная элита строительства. Единственный вуз, имеющий международную аккредитацию RIBA.',
    founded: 1980,
    ranking: 20,
    students: 6000,
    tuitionAvg: '1 200 000 – 1 500 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'SDU',
    mission: 'Excellence in education.',
    programs: [
      { name: 'Computer Science', degree: 'Bachelor', duration: '4 года', language: 'English' },
      { name: 'Information Systems', degree: 'Bachelor', duration: '4 года', language: 'English' },
      { name: 'Mathematics', degree: 'Bachelor', duration: '4 года', language: 'English' }
    ],
    partners: ['Suleyman Demirel Univ (Turkey)'],
    admissionDeadlines: '20.08',
    category: 'Private',
    achievements: ["Аккредитация ACQUIN", "Топ-3 педагогический вуз", "Высокая репутация в IT"],
    admissionRequirements: ["ЕНТ", "Внутренний экзамен SPT (SDU Proficiency Test) для скидок"],
    admissionProcedure: ["Регистрация на sdu.edu.kz", "Сдача SPT", "Сдача ЕНТ", "Подача документов"],
    scholarships: ["SDU Grants (до 100%) по результатам SPT", "Гос. гранты", "Скидки победителям олимпиад"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://sdu.edu.kz',
        phone: '+7 (727) 307 95 65',
        email: 'info@sdu.edu.kz',
        address: 'Алматинская обл., г. Каскелен, ул. Абылай хана, 1/1'
    }
  },
  
  // --- РЕГИОНАЛЬНЫЕ ---
  {
    id: 'karu',
    name: 'Карагандинский университет имени Е.А. Букетова',
    shortName: 'КарУ',
    location: 'Караганда',
    description: 'Один из крупнейших и старейших вузов страны. Классический университет, центр науки и образования Центрального Казахстана.',
    founded: 1938,
    ranking: 17,
    students: 13000,
    tuitionAvg: '600 000 – 900 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'KTU',
    mission: 'Инновационное развитие через интеграцию образования, науки и производства.',
    programs: [
      { name: 'Горное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Металлургия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Транспортная техника', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['ArcelorMittal', 'Kazakhmys'],
    admissionDeadlines: '20.08',
    category: 'State',
    achievements: ["Один из лидеров по трудоустройству технарей", "Корпоративный университет"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kstu.kz',
        phone: '+7 (7212) 56 03 28',
        email: 'kstu@kstu.kz',
        address: 'г. Караганда, пр. Нурсултана Назарбаева, 56'
    }
  },
  {
    id: 'auezov',
    name: 'Южно-Казахстанский университет им. М. Ауэзова',
    shortName: 'SKU',
    location: 'Шымкент',
    description: 'Крупнейший многопрофильный вуз юга страны. Огромный спектр специальностей от химической технологии до искусства и права.',
    founded: 1943,
    ranking: 5,
    students: 28000,
    tuitionAvg: '550 000 – 750 000 ₸',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'YU',
    mission: 'Служение региону через развитие человеческого капитала.',
    programs: [
      { name: 'Морская техника и технологии', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Нефтегазовое дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['Caspian Offshore'],
    admissionDeadlines: '25.08',
    category: 'State',
    achievements: ["Уникальные морские специальности", "Партнерство с нефтяными гигантами"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://yu.edu.kz',
        phone: '+7 (7292) 42 57 00',
        email: 'info@yu.edu.kz',
        address: 'г. Актау, 32 мкр.'
    }
  },
    {
    id: 'dosmukhamedov',
    name: 'Атырауский университет им. Х. Досмухамедова',
    shortName: 'ASU',
    location: 'Атырау',
    description: 'Главный вуз нефтяной столицы. Педагогика, естественные науки, экономика и журналистика.',
    founded: 1950,
    ranking: 29,
    students: 8000,
    tuitionAvg: '600 000 – 800 000 ₸',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'AOG',
    mission: 'Индустриальный вуз для нефтегазовой отрасли.',
    programs: [
      { name: 'Геология нефти и газа', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Бурение нефтяных и газовых скважин', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' }
    ],
    partners: ['TCO', 'NCOC', 'Schlumberger'],
    admissionDeadlines: '20.08',
    category: 'State',
    achievements: ["Тесные связи с TCO и NCOC", "Современные лаборатории"],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://aogu.edu.kz',
        phone: '+7 (7122) 36 05 06',
        email: 'info@aogu.edu.kz',
        address: 'г. Атырау, мкр. Атырау, 1'
    }
  },

  // =============================================
  // --- ЗАРУБЕЖНЫЕ ВУЗЫ (INTERNATIONAL) ---
  // =============================================
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    location: 'США, Кембридж',
    description: 'Один из ведущих технических университетов мира. MIT — глобальный лидер в области науки, технологий и инженерии. Диплом MIT признаётся работодателями во всём мире и открывает двери в крупнейшие компании и исследовательские центры.',
    founded: 1861,
    ranking: 1,
    students: 11500,
    tuitionAvg: 'от ~$60 000/год',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Cam',
    mission: 'Содействие образованию, учению и исследованиям на высшем уровне для блага общества.',
    programs: [
      { name: 'Computer Science (Part IA-IB)', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Алгоритмы, ИИ, программные системы.' },
      { name: 'Natural Sciences', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Физика, химия, биохимия, биология.' },
      { name: 'Economics', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Макро- и микроэкономика, финансы.' },
      { name: 'Law (LLB)', degree: 'Bachelor', duration: '3 года', language: 'English', description: 'Международное и европейское право.' },
    ],
    partners: ['NASA', 'Microsoft Research', 'DeepMind', 'Rolls-Royce'],
    admissionDeadlines: '15.10 (UCAS deadline)',
    category: 'International',
    achievements: [
      'QS World Ranking #2 / Times Higher Education #1',
      '121 Нобелевский лауреат',
      'Alma mater: Ньютон, Дарвин, Хокинг',
    ],
    admissionRequirements: [
      'A-Levels AAA / IB 40-42 баллов',
      'IELTS 7.5+ (6.5+ по каждой секции)',
      'Вступительные тесты (TMUA, ENGAA и др.)',
      'Интервью в колледже Cambridge',
      'Суперкуррикулярные активности по предмету',
    ],
    admissionProcedure: [
      'Выбор колледжа и подача через UCAS (15 октября).',
      'Прохождение предметных вступительных тестов.',
      'Интервью с преподавателями колледжа (декабрь).',
      'Условный оффер (conditional offer).',
      'Подтверждение результатов A-Levels / IB в августе.',
    ],
    scholarships: [
      'Cambridge Trust Scholarships',
      'Gates Cambridge Scholarships (полные)',
      'Commonwealth Scholarships',
      'Chevening Awards (UK Government)',
    ],
    dormitory: true,
    militaryDept: false,
    contacts: {
      website: 'https://www.cam.ac.uk',
      phone: '+44 (0)1223 337733',
      email: 'admissions@cam.ac.uk',
      address: 'The Old Schools, Trinity Lane, Cambridge CB2 1TN, UK',
    }
  },
  {
    id: 'mgu',
    name: 'Московский государственный университет им. М.В. Ломоносова',
    shortName: 'МГУ',
    location: 'Россия, Москва',
    description: 'Крупнейший и старейший университет России. МГУ — центр российской науки, культуры и образования. Входит в топ-100 мировых рейтингов. Ежегодно принимает студентов из Казахстана по государственным квотам.',
    founded: 1755,
    ranking: 87,
    students: 40000,
    tuitionAvg: 'от 280 000 – 450 000 ₽/год',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КарТУ',
    mission: 'Обеспечение промышленности высококвалифицированными инженерными кадрами.',
    programs: [
      { name: 'Горное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU', description: 'Разработка месторождений и маркшейдерское дело.' },
      { name: 'Металлургия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['ТУФрайберг', 'МГТУ им. Баумана'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Лидер в подготовке кадров для промышленности",
      "Сильная база для практического обучения"
    ],
    admissionRequirements: [
      ...DEFAULTS.requirements,
      "Для некоторых специальностей спец. экзамены"
    ],
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://www.kstu.kz',
        phone: '+7 (7212) 56-59-32',
        email: 'kstu@kstu.kz',
        address: 'г. Караганда, пр. Нурсултана Назарбаева, 56'
    }
  },
  {
    id: 'vktu',
    name: 'Восточно-Казахстанский технический университет им. Д. Серикбаева',
    shortName: 'ВКТУ',
    location: 'Усть-Каменогорск',
    description: 'Ведущий технический вуз Восточного Казахстана, специализирующийся на инженерии, металлургии, IT и архитектуре. Располагает современными научными лабораториями.',
    founded: 1958,
    ranking: 12,
    students: 8000,
    tuitionAvg: 'от 450 000 ₸',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КРУ',
    mission: 'Обеспечение северного региона качественными кадрами.',
    programs: [
      { name: 'Аграрные технологии', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогические науки', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Ветеринария', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
    ],
    partners: ['Уральский ГАУ', 'Vytautas Magnus University'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Сильнейшая школа ветеринарии и агрономии в регионе"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://www.ksu.edu.kz',
        phone: '+7 (7142) 51-11-98',
        email: 'info@ksu.edu.kz',
        address: 'г. Костанай, ул. Байтурсынова, 47'
    }
  },
  {
    id: 'sku',
    name: 'Северо-Казахстанский университет имени М. Козыбаева',
    shortName: 'СКУ',
    location: 'Петропавловск',
    description: 'Ведущий университет северного региона. Известен своими программами двудипломного образования и сильной базой для подготовки педагогов и инженеров.',
    founded: 1937,
    ranking: 20,
    students: 9000,
    tuitionAvg: 'от 420 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg/800px-Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ТарРУ',
    mission: 'Подготовка востребованных специалистов для Южного Казахстана.',
    programs: [
      { name: 'Водные ресурсы и водопользование', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Химическая инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Текстильная инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Университет Падуи', 'Ташкентский химико-технологический институт'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Крупнейший центр подготовки кадров по водному хозяйству",
      "Сильная научно-исследовательская база по химии фосфора"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://dulaty.kz',
        phone: '+7 (7262) 43-24-02',
        email: 'info@dulaty.kz',
        address: 'г. Тараз, ул. Сулейменова, 7'
    }
  },
  {
    id: 'karu',
    name: 'Карагандинский университет имени академика Е.А. Букетова',
    shortName: 'КарУ',
    location: 'Караганда',
    description: 'Один из крупнейших классических университетов Казахстана. Сильная научная база по химии, физике, истории и филологии.',
    founded: 1938,
    ranking: 14,
    students: 18000,
    tuitionAvg: 'от 480 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЗКГУ',
    mission: 'Подготовка востребованных специалистов для западного региона.',
    programs: [
      { name: 'Иностранные языки', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Искусство и музыка', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Физическая культура', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Johannes Gutenberg University Mainz', 'Самарский университет'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Сильная педагогическая школа с вековой историей"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://wku.edu.kz',
        phone: '+7 (7112) 51-42-66',
        email: 'wku@wku.edu.kz',
        address: 'г. Уральск, пр. Нурсултана Назарбаева, 162'
    }
  },
  {
    id: 'argu',
    name: 'Актюбинский региональный университет имени К. Жубанова',
    shortName: 'АРГУ',
    location: 'Актобе',
    description: 'Многопрофильный вуз Западного Казахстана. Готовит специалистов для нефтегазового сектора, IT, педагогики и медицины.',
    founded: 1966,
    ranking: 17,
    students: 11000,
    tuitionAvg: 'от 450 000 ₸',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЮКУ',
    mission: 'Инновационное развитие южного региона через образование.',
    programs: [
      { name: 'Пищевая инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Строительство', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Туризм и гостеприимство', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['University of Valencia', 'Казанский федеральный университет'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Входит в десятку лучших вузов Казахстана",
      "Крупнейший вуз по количеству студентов"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://auezov.edu.kz',
        phone: '+7 (7252) 21-01-41',
        email: 'info@auezov.edu.kz',
        address: 'г. Шымкент, пр. Тауке хана, 5'
    }
  },
  {
    id: 'kariu',
    name: 'Карагандинский индустриальный университет',
    shortName: 'КарИУ',
    location: 'Темиртау',
    description: 'Специализированный вуз, являющийся кузницей кадров для металлургической отрасли Казахстана. Базируется в индустриальном центре страны.',
    founded: 1963,
    ranking: 30,
    students: 3500,
    tuitionAvg: 'от 450 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазНМУ',
    mission: 'Подготовка элиты здравоохранения.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5+2 лет', language: 'KZ/RU/EN' },
      { name: 'Стоматология', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Фармация', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
    ],
    partners: ['Nagasaki University', 'Lithuanian University of Health Sciences'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Крупнейший медицинский вуз страны",
      "Собственные клинические базы и университетская клиника"
    ],
    admissionRequirements: [
      ...DEFAULTS.requirements,
      "Биология + Химия (профильные предметы ЕНТ)",
      "Специальный экзамен (психометрическое тестирование)"
    ],
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kaznmu.edu.kz',
        phone: '+7 (727) 338-70-90',
        email: 'info@kaznmu.kz',
        address: 'г. Алматы, ул. Толе би, 94'
    }
  },
  {
    id: 'mua',
    name: 'Медицинский университет Астана',
    shortName: 'МУА',
    location: 'Астана',
    description: 'Один из крупнейших и динамично развивающихся медицинских вузов столицы. Отличается сильными клиническими базами в национальных мед. центрах Астаны.',
    founded: 1964,
    ranking: 11,
    students: 8500,
    tuitionAvg: 'от 1 100 000 ₸',
    image: 'https://amu.edu.kz/upload/iblock/c53/c538b7d413e15779ecdfa2db7243c7b3.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЗКМУ',
    mission: 'Подготовка врачей для западного региона.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5+2 лет', language: 'KZ/RU/EN' },
      { name: 'Стоматология', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
    ],
    partners: ['Poznan University of Medical Sciences'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Собственный многопрофильный медицинский центр"
    ],
    admissionRequirements: [
      ...DEFAULTS.requirements,
      "Специальный экзамен"
    ],
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://zkmu.edu.kz',
        phone: '+7 (7132) 56-34-25',
        email: 'info@zkgmu.kz',
        address: 'г. Актобе, ул. Маресьева, 68'
    }
  },
  {
    id: 'kaznaiu',
    name: 'Казахский национальный аграрный исследовательский университет',
    shortName: 'КазНАИУ',
    location: 'Алматы',
    description: 'Старейший аграрный университет Казахстана. Занимается подготовкой специалистов для сельского хозяйства, экологии и биотехнологий.',
    founded: 1929,
    ranking: 13,
    students: 7500,
    tuitionAvg: 'от 400 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КАТИУ',
    mission: 'Подготовка кадров для индустриально-аграрного сектора экономики.',
    programs: [
      { name: 'Землеустройство', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Энергетика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Технология продовольственных продуктов', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['University of California, Davis', 'Weihenstephan-Triesdorf'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Тесное сотрудничество с AgroParisTech (Франция) и UC Davis (США)"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kazatu.edu.kz',
        phone: '+7 (7172) 31-75-47',
        email: 'info@kazatu.kz',
        address: 'г. Астана, пр. Победы, 62'
    }
  },
  {
    id: 'kaznu',
    name: 'Казахский национальный университет имени аль-Фараби',
    shortName: 'КазНУ',
    location: 'Алматы',
    description: 'Ведущий многопрофильный классический университет страны. Занимает самые высокие позиции Казахстана в мировом рейтинге QS (Топ-200).',
    founded: 1934,
    ranking: 1,
    students: 25000,
    tuitionAvg: 'от 1 200 000 ₸',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЕНУ',
    mission: 'Стать ведущим исследовательским центром Евразии.',
    programs: [
      { name: 'Политология и экономика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Строительство и архитектура', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Информационные технологии', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['RUDN University', 'Kyungpook National University'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Топ-3 вузов Казахстана",
      "Крупнейший центр гуманитарных и технических исследований в Астане"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://enu.kz',
        phone: '+7 (7172) 70-95-00',
        email: 'enu@enu.kz',
        address: 'г. Астана, ул. Сатпаева, 2'
    }
  },
  {
    id: 'mnu',
    name: 'Maqsut Narikbayev University (КАЗГЮУ)',
    shortName: 'MNU',
    location: 'Астана',
    description: 'Один из самых престижных гуманитарно-правовых вузов Казахстана. Славится сильнейшей школой права и бизнеса, обучение по международным стандартам.',
    founded: 1994,
    ranking: 6,
    students: 6000,
    tuitionAvg: 'от 1 500 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Suleyman_Demirel_University_Campus.jpg/800px-Suleyman_Demirel_University_Campus.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазНПУ',
    mission: 'Подготовка педагогов новой формации.',
    programs: [
      { name: 'Педагогика и методика начального обучения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Иностранные языки: два иностранных языка', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Специальная педагогика (дефектология)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Sorbonne University', 'Zhejiang University'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Вуз №1 в педагогическом образовании Казахстана",
      "Институт Сорбонна-Казахстан"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kaznpu.kz',
        phone: '+7 (727) 291-73-71',
        email: 'info@kaznpu.kz',
        address: 'г. Алматы, пр. Достык, 13'
    }
  },
  {
    id: 'kazgasa',
    name: 'Казахская головная архитектурно-строительная академия',
    shortName: 'КазГАСА',
    location: 'Алматы',
    description: 'Главный и ведущий вуз Казахстана в сфере архитектуры, дизайна и строительства. Известен высоким уровнем подготовки креативных кадров.',
    founded: 1980,
    ranking: 25,
    students: 6000,
    tuitionAvg: 'от 800 000 ₸',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Narxoz',
    mission: 'Вдохновлять на создание новой экономики.',
    programs: [
      { name: 'Финансы и аналитика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Менеджмент и маркетинг', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Data Science', degree: 'Bachelor', duration: '4 года', language: 'EN' },
    ],
    partners: ['Coventry University', 'Penn State University'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Европейская аккредитация FIBAA",
      "Полностью обновленный сверхсовременный экологичный кампус (2022)"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["Скидки за высокий ЕНТ", "Гранты от бизнес-партнеров", "Государственные гранты"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://narxoz.edu.kz',
        phone: '+7 (727) 346-28-28',
        email: 'info@narxoz.kz',
        address: 'г. Алматы, ул. Жандосова, 55'
    }
  },
  {
    id: 'uib',
    name: 'Университет международного бизнеса имени К. Сагадиева',
    shortName: 'UIB',
    location: 'Алматы',
    description: 'Специализированный бизнес-вуз, ориентированный на подготовку предпринимателей, маркетологов и управленцев.',
    founded: 1992,
    ranking: 21,
    students: 5000,
    tuitionAvg: 'от 900 000 ₸',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазУМОиМЯ',
    mission: 'Интеграция Казахстана в мировое сообщество через языки и дипломатию.',
    programs: [
      { name: 'Переводческое дело (синхронный перевод)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Международные отношения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Востоковедение', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Hankuk University of Foreign Studies', 'Sorbonne Nouvelle'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Вуз №1 по подготовке переводчиков с 14 иностранных языков"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://ablaikhan.kz',
        phone: '+7 (727) 292-03-84',
        email: 'info@ablaikhan.kz',
        address: 'г. Алматы, ул. Муратбаева, 200'
    }
  },
  {
    id: 'aga',
    name: 'Академия гражданской авиации',
    shortName: 'АГА',
    location: 'Алматы',
    description: 'Единственное высшее учебное заведение в Казахстане и Центральной Азии, осуществляющее подготовку пилотов, авиадиспетчеров и авиаинженеров.',
    founded: 1995,
    ranking: 35,
    students: 3000,
    tuitionAvg: 'от 1 000 000 ₸',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазНАИ',
    mission: 'Сохранение и развитие национального искусства.',
    programs: [
      { name: 'Кино и ТВ (Режиссура, Операторское искусство)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Театральное искусство (Актёрское мастерство)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Хореография', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['ВГИК', 'New York Film Academy'],
    admissionDeadlines: '07.07', // Творческие вузы закрывают прием раньше
    category: 'National',
    achievements: [
      "Выпускники регулярно побеждают на Каннском и Венецианском кинофестивалях",
      "Национальный статус академии"
    ],
    admissionRequirements: [
      "ЕНТ (История Казахстана + Грамотность чтения)",
      "Творческие экзамены (2 этапа: мастерство, собеседование)"
    ],
    admissionProcedure: [
      "Сдача ЕНТ",
      "Сдача творческих экзаменов",
      "Подача заявления на грант"
    ],
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kaznai.kz',
        phone: '+7 (727) 261-11-04',
        email: 'info@kaznai.kz',
        address: 'г. Алматы, ул. Панфилова, 127'
    }
  },
  {
    id: 'knb',
    name: 'Академия Комитета национальной безопасности Республики Казахстан',
    shortName: 'Академия КНБ',
    location: 'Астана',
    description: 'Закрытое высшее учебное заведение, осуществляющее подготовку, переподготовку и повышение квалификации офицерских кадров для органов национальной безопасности.',
    founded: 1994,
    ranking: null, // Спец. вузы не участвуют в общих рейтингах
    students: 1500,
    tuitionAvg: 'Бесплатно (Гособеспечение)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'МВД',
    mission: 'Подготовка квалифицированных офицеров полиции.',
    programs: [
      { name: 'Правоохранительная деятельность', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Обеспечение законности и правопорядка', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Академия управления МВД РФ'],
    admissionDeadlines: '20.06',
    category: 'Military',
    achievements: [
      "Курсанты на полном государственном обеспечении",
      "Мощная база криминалистики и боевой подготовки"
    ],
    admissionRequirements: [
      "ЕНТ (не менее 50 баллов)",
      "Медицинская комиссия (ВВК)",
      "Физическая подготовка (бег, подтягивания)"
    ],
    admissionProcedure: [
      "Обращение в Департамент Полиции",
      "Прохождение медкомиссии",
      "Сдача ЕНТ и физ. нормативов"
    ],
    scholarships: ["100% государственное обеспечение"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kpa.kz',
        phone: '+7 (7212) 30-33-33',
        email: 'info@kpa.kz',
        address: 'г. Караганда, ул. Ермекова, 124'
    }
  },
  {
    id: 'sv',
    name: 'Военный институт Сухопутных войск им. Сагадата Нурмагамбетова',
    shortName: 'ВИСВ',
    location: 'Алматы',
    description: 'Главный военный вуз страны по подготовке командного состава для Сухопутных войск Вооруженных Сил РК.',
    founded: 1970,
    ranking: null,
    students: 1800,
    tuitionAvg: 'Бесплатно (Гособеспечение)',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'АУЭС',
    mission: 'Развитие инженерной мысли в энергетике и связи.',
    programs: [
      { name: 'Теплоэнергетика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Радиотехника и телекоммуникации', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Космическая техника и технологии', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['МЭИ (Москва)', 'Seoul National University of Science and Technology'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Кузница инженеров-энергетиков для всего Казахстана",
      "Крупнейшие лаборатории от Schneider Electric, Siemens, Казкосмос"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://aues.edu.kz',
        phone: '+7 (727) 292-73-66',
        email: 'aues@aues.kz',
        address: 'г. Алматы, ул. Байтурсынова, 126'
    }
  },
  {
    id: 'mutg',
    name: 'Международный университет туризма и гостеприимства',
    shortName: 'МУТГ',
    location: 'Туркестан',
    description: 'Первый и единственный в Казахстане профильный государственный университет, готовящий специалистов международного уровня в сфере туризма.',
    founded: 2019,
    ranking: 28,
    students: 3500,
    tuitionAvg: 'от 600 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Торайгыров',
    mission: 'Подготовка востребованных кадров для индустриального Павлодарского региона.',
    programs: [
      { name: 'Электроэнергетика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Металлургия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['National Research Tomsk Polytechnic University', 'Люблинский технический университет'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Сильный инженерно-технический профиль",
      "Собственный технопарк и стартап-академия"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://tou.edu.kz',
        phone: '+7 (7182) 67-37-37',
        email: 'info@tou.edu.kz',
        address: 'г. Павлодар, ул. Ломова, 64'
    }
  },
  {
    id: 'aung',
    name: 'Атырауский университет нефти и газа имени Сафи Утебаева',
    shortName: 'АУНГ',
    location: 'Атырау',
    description: 'Единственный в Казахстане специализированный профильный вуз, готовящий специалистов исключительно для нефтегазовой отрасли.',
    founded: 1980,
    ranking: 27,
    students: 4500,
    tuitionAvg: 'от 450 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Yessenov',
    mission: 'Подготовка конкурентоспособных специалистов для Каспийского региона.',
    programs: [
      { name: 'Морская техника и технологии', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Нефтегазовое дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Транспорт, транспортная техника', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Казахстанская Морская Академия', 'Германский морской институт'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Единственный вуз страны с сильной Морской академией",
      "Уникальная лаборатория по изучению Каспийского моря"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://yu.edu.kz',
        phone: '+7 (7292) 42-57-77',
        email: 'info@yu.edu.kz',
        address: 'г. Актау, 32 микрорайон'
    }
  },
  {
    id: 'shakarim',
    name: 'Университет имени Шакарима города Семей',
    shortName: 'Университет Шакарима',
    location: 'Семей',
    description: 'Крупнейший многопрофильный вуз области Абай. Готовит специалистов для агропромышленного комплекса, образования, ветеринарии и гуманитарных сфер.',
    founded: 1995,
    ranking: 31,
    students: 6500,
    tuitionAvg: 'от 350 000 ₸',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Zhetysu',
    mission: 'Подготовка современных учителей и специалистов для региона Жетысу.',
    programs: [
      { name: 'Педагогика и психология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Информатика и программирование', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Иностранный язык: два иностранных языка', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Университет Овьедо (Испания)', 'Балтийская международная академия'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Инновационные лаборатории педагогического мастерства"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://zhetysu.edu.kz',
        phone: '+7 (7282) 22-17-06',
        email: 'info@zhetysu.edu.kz',
        address: 'г. Талдыкорган, ул. Жансугурова, 187А'
    }
  },
  {
    id: 'kuam',
    name: 'Кокшетауский университет имени А. Мырзахметова',
    shortName: 'КУАМ',
    location: 'Кокшетау',
    description: 'Один из ведущих вузов Акмолинской области. Многопрофильный университет, выпускающий специалистов в сфере юриспруденции, педагогики и дизайна.',
    founded: 2000,
    ranking: 38,
    students: 4000,
    tuitionAvg: 'от 350 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Коркыт ата',
    mission: 'Служение обществу через предоставление качественного образования в южном регионе.',
    programs: [
      { name: 'Инженерия и ИТ (совместно с SeoulTech)', degree: 'Bachelor', duration: '4 года', language: 'KZ/EN' },
      { name: 'Нефтегазовое дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Водное хозяйство', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Seoul National University of Science and Technology (SeoulTech)'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Открытие Школы Искусственного Интеллекта совместно с Южной Кореей (2023)"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://korkyt.kz',
        phone: '+7 (7242) 26-17-25',
        email: 'info@korkyt.kz',
        address: 'г. Кызылорда, ул. Айтеке би, 29A'
    }
  },
  {
    id: 'wkau',
    name: 'Западно-Казахстанский аграрно-технический университет имени Жангир хана',
    shortName: 'ЗКАТУ',
    location: 'Уральск',
    description: 'Один из главных аграрно-технических вузов страны. Располагает огромным кампусом и сильной базой по машиностроению и ветеринарии.',
    founded: 1963,
    ranking: 26,
    students: 5500,
    tuitionAvg: 'от 390 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КарУК',
    mission: 'Развитие предпринимательства и экономики через качественное образование.',
    programs: [
      { name: 'Экономика и учет', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Ресторанное дело и гостиничный бизнес', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Таможенное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Университет Яноша Кодолани (Венгрия)'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Сильнейшие программы по логистике и экономике в регионе"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://keu.kz',
        phone: '+7 (7212) 44-16-24',
        email: 'mail@keu.kz',
        address: 'г. Караганда, ул. Академическая, 9'
    }
  },
  {
    id: 'atu',
    name: 'Алматинский технологический университет',
    shortName: 'АТУ',
    location: 'Алматы',
    description: 'Ведущий вуз Казахстана и Центральной Азии по подготовке кадров для пищевой, легкой промышленности и индустрии гостеприимства.',
    founded: 1957,
    ranking: 18,
    students: 8000,
    tuitionAvg: 'от 700 000 ₸',
    image: 'https://atu.edu.kz/wp-content/uploads/2021/04/Glavnyj-korpus-ATU.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'МКТУ',
    mission: 'Служить мостом науки и образования для тюркского мира.',
    programs: [
      { name: 'Медицина', degree: 'Bachelor', duration: '5 лет', language: 'KZ/TR/RU' },
      { name: 'Международные отношения', degree: 'Bachelor', duration: '4 года', language: 'KZ/TR/EN' },
      { name: 'Тюркология', degree: 'Bachelor', duration: '4 года', language: 'KZ/TR' },
    ],
    partners: ['Gazi University (Турция)', 'Ankara University'],
    admissionDeadlines: '25.08',
    category: 'International',
    achievements: [
      "Собственная университетская клиника европейского уровня",
      "Возможность бесплатного обучения в Турции по обмену"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["Спец. гранты Турции", "Государственные гранты РК"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://ayu.edu.kz',
        phone: '+7 (72533) 6-36-36',
        email: 'info@ayu.edu.kz',
        address: 'г. Туркестан, пр. Б.Саттарханова, 29'
    }
  },
  {
    id: 'argu',
    name: 'Актюбинский региональный университет имени К. Жубанова',
    shortName: 'АРГУ',
    location: 'Актобе',
    description: 'Один из крупнейших и старейших региональных вузов западного Казахстана. Готовит кадры для педагогики, ИТ и инженерии.',
    founded: 1966,
    ranking: 19,
    students: 14000,
    tuitionAvg: 'от 380 000 ₸',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'СКУ',
    mission: 'Предоставление качественного образования на Севере Казахстана.',
    programs: [
      { name: 'Агрономия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Биотехнология (совместно с UoA)', degree: 'Bachelor', duration: '4 года', language: 'EN' },
      { name: 'Педагогические науки', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['University of Arizona (США)'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Двудипломная программа с University of Arizona (США)"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: ["Гранты UoA", "Государственные гранты"],
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://ku.edu.kz',
        phone: '+7 (7152) 49-32-33',
        email: 'mail@ku.edu.kz',
        address: 'г. Петропавловск, ул. Пушкина, 86'
    }
  },
  {
    id: 'kru',
    name: 'Костанайский региональный университет имени А. Байтурсынова',
    shortName: 'КРУ',
    location: 'Костанай',
    description: 'Крупнейший вуз Костанайской области, готовящий специалистов для агропромышленного комплекса, экономики и права.',
    founded: 1939,
    ranking: 33,
    students: 6500,
    tuitionAvg: 'от 360 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЖезУ',
    mission: 'Кадровое обеспечение промышленности региона Улытау.',
    programs: [
      { name: 'Горное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Металлургия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Электроэнергетика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Казахмыс', 'Корпорация ERG'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Тесное сотрудничество с корпорацией «Казахмыс»"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://zhezu.kz',
        phone: '+7 (7102) 72-13-10',
        email: 'info@zhezu.kz',
        address: 'г. Жезказган, пр. Алашахана, 1Б'
    }
  },
  {
    id: 'abu',
    name: 'Alikhan Bokeikhan University',
    shortName: 'ABU',
    location: 'Семей',
    description: 'Многопрофильный инновационный университет на востоке Казахстана. Лидер в регионе по подготовке кадров в сфере права, ИТ и гуманитарных наук.',
    founded: 1998,
    ranking: 34,
    students: 5000,
    tuitionAvg: 'от 380 000 ₸',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'QyzPU',
    mission: 'Подготовка педагогов-лидеров нового поколения.',
    programs: [
      { name: 'Дошкольное обучение и воспитание', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогика и методика начального обучения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Специальная педагогика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Niğde Ömer Halisdemir University (Турция)', 'АГПУ (Россия)'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Единственный женский университет в Казахстане и СНГ",
      "100% обеспечение иногородних студенток общежитием"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://qyzpu.edu.kz',
        phone: '+7 (727) 237-00-00',
        email: 'info@qyzpu.edu.kz',
        address: 'г. Алматы, ул. Айтеке би, 99'
    }
  },
  {
    id: 'kazitu',
    name: 'Казахстанский инженерно-технологический университет',
    shortName: 'КазИТУ',
    location: 'Алматы',
    description: 'Инновационный вуз, ориентированный на подготовку ИТ-специалистов, пищевых технологов и инженеров-биотехнологов.',
    founded: 2001,
    ranking: 42,
    students: 3500,
    tuitionAvg: 'от 550 000 ₸',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Esil',
    mission: 'Формирование интеллектуальной экономической элиты Казахстана.',
    programs: [
      { name: 'Финансы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Учет и аудит', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Kangnam University (Корея)'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Тесные связи с финансовым центром Астаны (AIFC)"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://esil.edu.kz',
        phone: '+7 (7172) 27-01-01',
        email: 'info@esil.edu.kz',
        address: 'г. Астана, ул. Жубанова, 7'
    }
  },
  {
    id: 'turan-astana',
    name: 'Университет Туран-Астана',
    shortName: 'Туран-Астана',
    location: 'Астана',
    description: 'Многопрофильный столичный вуз, входящий в образовательную корпорацию «Туран». Готовит юристов, экономистов, дизайнеров и ИТ-специалистов.',
    founded: 1998,
    ranking: 39,
    students: 4000,
    tuitionAvg: 'от 600 000 ₸',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ВКГУ',
    mission: 'Создание интеллектуального потенциала для процветания Восточного Казахстана.',
    programs: [
      { name: 'Металлургия и машиностроение', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогика и психология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Экономика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Уральский федеральный университет', 'Алтайский государственный университет'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Крупнейший вуз на Востоке страны",
      "Мощная база для горнодобывающей и металлургической промышленности ВКО"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://vku.edu.kz',
        phone: '+7 (7232) 76-29-37',
        email: 'info@vku.edu.kz',
        address: 'г. Усть-Каменогорск, ул. 30 Гвардейской дивизии, 34'
    }
  },
  {
    id: 'kazcons',
    name: 'Казахская национальная консерватория имени Курмангазы',
    shortName: 'КазНацКонс',
    location: 'Алматы',
    description: 'Главный музыкальный вуз страны. Alma mater всех казахстанских профессиональных музыкантов, дирижёров и певцов.',
    founded: 1944,
    ranking: 50,
    students: 800,
    tuitionAvg: 'от 1 000 000 ₸',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазАСТ',
    mission: 'Развитие олимпийского движения и спортивной науки в Казахстане.',
    programs: [
      { name: 'Физическая культура и спорт (тренерство)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Спортивный менеджмент', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Туризм', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['IOC Olympic Solidarity', 'Российский государственный университет физической культуры'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Alma mater олимпийских чемпионов из Казахстана",
      "Уникальные спортивные базы и манежи"
    ],
    admissionRequirements: [
      ...DEFAULTS.requirements,
      "Спортивный разряд (не ниже 1 взрослого)"
    ],
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://kasto.kz',
        phone: '+7 (727) 247-55-47',
        email: 'info@kasto.kz',
        address: 'г. Алматы, пр. Абая, 85'
    }
  },
  {
    id: 'bolashak',
    name: 'Университет «Болашак»',
    shortName: 'Болашак',
    location: 'Кызылорда',
    description: 'Крупный частный университет Кызылординской области, предлагающий широкий спектр программ от юриспруденции до IT и педагогики.',
    founded: 1995,
    ranking: 44,
    students: 4500,
    tuitionAvg: 'от 350 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КАЗГЮИУ',
    mission: 'Развитие гуманитарного и правового образования на Востоке Казахстана.',
    programs: [
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Международные отношения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Социальная работа', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Санкт-Петербургский государственный университет'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Одна из ведущих юридических клиник Восточного Казахстана"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://kazguu.kz',
        phone: '+7 (7222) 42-67-89',
        email: 'info@kazguu.kz',
        address: 'г. Семей, ул. Дулатова, 180'
    }
  },
  {
    id: 'turan-almaty',
    name: 'Университет Туран (Алматы)',
    shortName: 'Туран',
    location: 'Алматы',
    description: 'Один из самых известных частных вузов Казахстана. Флагман корпорации «Туран». Сильные программы по журналистике, дизайну, юриспруденции и ИТ.',
    founded: 1992,
    ranking: 11,
    students: 10000,
    tuitionAvg: 'от 800 000 ₸',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ВИТА',
    mission: 'Подготовка врачей международного уровня.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Фармация', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
      { name: 'Сестринское дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Kraków Medical University', 'Grodno State Medical University'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Собственные клинические базы в Алматы",
      "Диплом, признанный в странах ЕС"
    ],
    admissionRequirements: [
      ...DEFAULTS.requirements,
      "Профильные: Биология + Химия"
    ],
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://vita.edu.kz',
        phone: '+7 (727) 291-01-00',
        email: 'info@vita.edu.kz',
        address: 'г. Алматы, ул. Манаса, 34'
    }
  },
  {
    id: 'amu',
    name: 'Алматы Менеджмент Университет (AlmaU)',
    shortName: 'AlmaU (AMU)',
    location: 'Алматы',
    description: 'Первый бизнес-университет Казахстана с двойными дипломами MBA и аккредитацией AACSB — самой престижной в мире для бизнес-школ.',
    founded: 1988,
    ranking: 8,
    students: 5000,
    tuitionAvg: 'от 1 400 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Suleyman_Demirel_University_Campus.jpg/800px-Suleyman_Demirel_University_Campus.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазАТК',
    mission: 'Обеспечение транспортной системы Казахстана высококвалифицированными специалистами.',
    programs: [
      { name: 'Эксплуатация транспортных средств', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Логистика и управление цепями поставок', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Строительство железных дорог', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['КТЖ (Казахстан Темір Жолы)', 'Московский государственный университет путей сообщения'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Главный кадровый поставщик для КТЖ и транспортной отрасли",
      "Партнёрство с крупнейшими логистическими компаниями страны"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://kazatk.kz',
        phone: '+7 (727) 294-62-86',
        email: 'info@kazatk.kz',
        address: 'г. Алматы, ул. Шевченко, 97'
    }
  },
  {
    id: 'iab',
    name: 'Международная академия бизнеса',
    shortName: 'МАБ (IAB)',
    location: 'Алматы',
    description: 'Один из ведущих негосударственных вузов Казахстана, специализирующийся на подготовке топ-менеджеров и предпринимателей. Тесные связи с корпоративным сектором.',
    founded: 1992,
    ranking: 12,
    students: 4000,
    tuitionAvg: 'от 1 100 000 ₸',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЮКУ',
    mission: 'Стать университетом мирового класса, ведущим трансформацию Южного Казахстана.',
    programs: [
      { name: 'Медицина (общая)', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Химическая инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Архитектура', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
    ],
    partners: ['Clemson University (США)', 'Freiberg University of Mining and Technology'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Крупнейший вуз страны по числу студентов (35 000+)",
      "Топ-5 вузов Казахстана по версии QS"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://ukgu.kz',
        phone: '+7 (7252) 27-10-01',
        email: 'info@ukgu.kz',
        address: 'г. Шымкент, пр. Тауке хана, 5'
    }
  },
  {
    id: 'kgu',
    name: 'Карагандинский университет им. академика Е. А. Букетова',
    shortName: 'КарГУ / КГУ',
    location: 'Караганда',
    description: 'Второй по величине классический вуз страны и крупнейший на Севере. Мощные исследовательские центры и сильная физико-математическая школа.',
    founded: 1972,
    ranking: 4,
    students: 18000,
    tuitionAvg: 'от 430 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ВКГТУ',
    mission: 'Технический прогресс через высококачественное инженерное образование.',
    programs: [
      { name: 'Горное дело (открытые и подземные работы)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Металлургия цветных металлов', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Приборостроение', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Казцинк', 'Ульба-Металлургический завод', 'Фрайберг (Германия)'],
    admissionDeadlines: '25.08',
    category: 'Regional',
    achievements: [
      "Базовые кафедры прямо на производстве (Казцинк, UMZ)",
      "Мощные лаборатории материаловедения и металлургии"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: true,
    contacts: {
        website: 'https://ektu.kz',
        phone: '+7 (7232) 54-05-40',
        email: 'info@ektu.kz',
        address: 'г. Усть-Каменогорск, ул. Серикбаева, 19'
    }
  },
  {
    id: 'astana-it',
    name: 'Astana IT University',
    shortName: 'AITU',
    location: 'Астана',
    description: 'Совершенно новый ИТ-вуз, созданный совместно с Правительством Казахстана и лидерами ИТ-индустрии (Microsoft, Cisco, Huawei). Обучение только на английском языке.',
    founded: 2019,
    ranking: 3,
    students: 3000,
    tuitionAvg: 'от 1 600 000 ₸',
    image: 'https://astanait.edu.kz/wp-content/uploads/2021/04/aitu.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КазГосЖенПУ',
    mission: 'Раскрывать потенциал каждой студентки для служения обществу.',
    programs: [
      { name: 'Педагогика и методика начального обучения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Психология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Дошкольное образование', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Sookmyung Women\'s University (Южная Корея)'],
    admissionDeadlines: '25.08',
    category: 'National',
    achievements: [
      "Специализированный вуз для подготовки педагогов-женщин",
      "Тесное сотрудничество с системой дошкольного и школьного образования Алматы"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://kazgoszhenpу.edu.kz',
        phone: '+7 (727) 237-00-10',
        email: 'zhenpу@edu.kz',
        address: 'г. Алматы, ул. Айтеке би, 99А'
    }
  },
  {
    id: 'satbayev',
    name: 'Казахский национальный исследовательский технический университет им. К. И. Сатпаева',
    shortName: 'КазНИТУ (Satbayev University)',
    location: 'Алматы',
    description: 'Главный политехнический и горно-геологический университет страны. Лидер по подготовке инженеров для горнодобывающей, нефтяной и энергетической промышленности.',
    founded: 1934,
    ranking: 6,
    students: 15000,
    tuitionAvg: 'от 900 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg/800px-Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ИнЕУ',
    mission: 'Формировать инновационную личность через современное образование.',
    programs: [
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Экономика и менеджмент', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Гданьская политехника (Польша)'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Лидирует по числу выпускников-предпринимателей в регионе"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://ineu.edu.kz',
        phone: '+7 (7182) 67-21-00',
        email: 'info@ineu.edu.kz',
        address: 'г. Павлодар, ул. Ломова, 45'
    }
  },
  {
    id: 'kguti',
    name: 'Казахстанско-Германский университет',
    shortName: 'КНУ / DKU',
    location: 'Алматы',
    description: 'Совместный казахстанско-германский вуз с обучением на немецком и английском языках. Одна из лучших точек входа для тех, кто планирует карьеру в Германии или ЕС.',
    founded: 1999,
    ranking: 48,
    students: 1200,
    tuitionAvg: 'от 1 300 000 ₸',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЖарГУ',
    mission: 'Обеспечение кадрами приграничных регионов Жетысу.',
    programs: [
      { name: 'Педагогика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Туризм (Китай-туры)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/CN' },
    ],
    partners: ['Урумчийский университет (Китай)'],
    admissionDeadlines: '25.08',
    category: 'Private',
    achievements: [
      "Уникальное географическое расположение — у границы с Китаем",
      "Обучение китайскому языку в программе туризма"
    ],
    admissionRequirements: DEFAULTS.requirements,
    admissionProcedure: DEFAULTS.procedure,
    scholarships: DEFAULTS.scholarships,
    dormitory: true,
    militaryDept: false,
    contacts: {
        website: 'https://zharku.edu.kz',
        phone: '+7 (72837) 5-05-25',
        email: 'info@zharku.edu.kz',
        address: 'г. Жаркент, ул. Достык, 1'
    }
  },
  {
    id: 'kazutb',
    name: 'Казахстанский университет технологии и бизнеса',
    shortName: 'КазУТБ',
    location: 'Астана',
    description: 'Многопрофильный столичный вуз, подготавливающий специалистов в сферах бизнеса, технологий и сервиса. Гибкие программы и дистанционное обучение.',
    founded: 2000,
    ranking: 49,
    students: 5000,
    tuitionAvg: 'от 550 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg/800px-Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'AIM', mission: 'Бизнес-образование, которое меняет карьеру.',
    programs: [
      { name: 'MBA', degree: 'Master', duration: '1.5 года', language: 'EN' },
      { name: 'Executive MBA', degree: 'Master', duration: '2 года', language: 'EN' },
      { name: 'Менеджмент', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Rotterdam School of Management', 'Business School Netherlands'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Один из немногих вузов с аккредитованной программой MBA в Казахстане"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: false, militaryDept: false,
    contacts: { website: 'https://aim.edu.kz', phone: '+7 (727) 259-09-99', email: 'info@aim.edu.kz', address: 'г. Алматы, ул. Толе би, 59' }
  },
  {
    id: 'meduniver-astana',
    name: 'НАО «Медицинский университет Астана»',
    shortName: 'МУА',
    location: 'Астана',
    description: 'Один из ведущих медицинских вузов страны с государственным финансированием. Сильная клиническая база — Национальный медицинский холдинг.',
    founded: 1964, ranking: 10, students: 5000, tuitionAvg: 'от 1 500 000 ₸',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'СЕМК', mission: 'Мировые стандарты медицины — в Казахстане.',
    programs: [
      { name: 'Общая медицина (MD)', degree: 'Bachelor', duration: '5 лет', language: 'KZ/EN' },
      { name: 'Биомедицинская наука', degree: 'Bachelor', duration: '4 года', language: 'EN' },
    ],
    partners: ['University of Edinburgh', 'Mayo Clinic'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Первый в ЦА вуз с системой обучения Objective Structured Clinical Examination (OSCE)"],
    admissionRequirements: [...DEFAULTS.requirements, "Биология + Химия", "Английский язык (B2+)"],
    admissionProcedure: DEFAULTS.procedure, scholarships: ["Президентский грант", "Гос. гранты"],
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://cemk.kz', phone: '+7 (727) 266-88-00', email: 'info@cemk.kz', address: 'г. Алматы, пр. Аль-Фараби, 71/23' }
  },
  {
    id: 'kgu-kostanay',
    name: 'Костанайский государственный университет им. А. Байтурсынова',
    shortName: 'КГУ им. Байтурсынова',
    location: 'Костанай',
    description: 'Классический государственный университет Костанайской области. Широкий спектр программ от аграрной техники до гуманитарных наук.',
    founded: 1939, ranking: 33, students: 6500, tuitionAvg: 'от 360 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Suleyman_Demirel_University_Campus.jpg/800px-Suleyman_Demirel_University_Campus.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КарМУ', mission: 'Наука и практика на службе здоровья.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Стоматология', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
      { name: 'Общественное здравоохранение', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Ruhr University Bochum (Германия)', 'Karolinska Institute (Швеция)'],
    admissionDeadlines: '25.08', category: 'National',
    achievements: ["Топ-2 медицинских вузов Казахстана", "Входит в международный рейтинг QS"],
    admissionRequirements: [...DEFAULTS.requirements, "Профильные: Биология + Химия"],
    admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://qmu.kz', phone: '+7 (7212) 51-34-76', email: 'info@qmu.kz', address: 'г. Караганда, ул. Гоголя, 40' }
  },
  {
    id: 'riedel',
    name: 'Казахстанско-Британский технический университет',
    shortName: 'КБТУ',
    location: 'Алматы',
    description: 'Совместный казахстанско-британский технический вуз при поддержке BP. Лидер в нефтегазовом инжиниринге и ИТ. Обучение на английском языке.',
    founded: 1999, ranking: 7, students: 3000, tuitionAvg: 'от 2 200 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/KBTU_Building_Almaty.jpg/800px-KBTU_Building_Almaty.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Болашак ЮКО', mission: 'Доступное и качественное образование для каждого.',
    programs: [
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Экономика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Университет Конья (Турция)'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Самые доступные цены среди частных вузов ЮКО"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://bolashak-shymkent.kz', phone: '+7 (7252) 53-03-49', email: 'info@bolashak-shymkent.kz', address: 'г. Шымкент, пр. Тауке хана, 52' }
  },
  {
    id: 'kokshe-acad',
    name: 'Кокшетауский университет',
    shortName: 'КУ Кокшетау',
    location: 'Кокшетау',
    description: 'Государственный классический университет Акмолинской области. Широкий спектр специальностей, доступные цены.',
    founded: 1996, ranking: 38, students: 5000, tuitionAvg: 'от 360 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Suleyman_Demirel_University_Campus.jpg/800px-Suleyman_Demirel_University_Campus.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'КарТУ', mission: 'Инженеры для промышленности Казахстана и мира.',
    programs: [
      { name: 'Горное дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Электроэнергетика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Программная инженерия', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Clausthal University of Technology (Германия)', 'Арселор Миттал'],
    admissionDeadlines: '25.08', category: 'National',
    achievements: ["Базовая кафедра на «АрселорМиттал Темиртау»", "Топ-5 технических вузов страны"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: true,
    contacts: { website: 'https://kstu.kz', phone: '+7 (7212) 56-59-32', email: 'info@kstu.kz', address: 'г. Караганда, Бульвар Мира, 56' }
  },
  {
    id: 'mangilik-el',
    name: 'Университет «Мәңгілік Ел»',
    shortName: 'Мәңгілік Ел',
    location: 'Астана',
    description: 'Современный частный вуз столицы. Сильные программы в области права, международных отношений и ИТ с акцентом на казахский язык и национальные ценности.',
    founded: 2005, ranking: null, students: 3000, tuitionAvg: 'от 480 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg/800px-Nazarbayev_University_in_Astana%2C_Kazakhstan.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЗКИТУ', mission: 'Инновации для Западного Казахстана.',
    programs: [
      { name: 'Информационные системы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Дизайн', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Менеджмент', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Ульяновский государственный технический университет'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Быстрорастущий вуз с современной инфраструктурой"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://zkitu.kz', phone: '+7 (7112) 50-30-10', email: 'info@zkitu.kz', address: 'г. Уральск, пр. Достык, 178' }
  },
  {
    id: 'gumilev-univer',
    name: 'Университет имени Л.Н. Гумилёва (частный)',
    shortName: 'ЧУ Гумилёва',
    location: 'Астана',
    description: 'Негосударственный многопрофильный университет столицы с широким набором гуманитарных и технических программ.',
    founded: 2003, ranking: null, students: 3500, tuitionAvg: 'от 420 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ШУ', mission: 'Образование с заботой о каждом студенте.',
    programs: [
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Педагогика и методика начального обучения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Финансы', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Selçuk Üniversitesi (Турция)'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Самые доступные цены в Шымкенте среди аккредитованных вузов"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://shu.edu.kz', phone: '+7 (7252) 21-07-12', email: 'info@shu.edu.kz', address: 'г. Шымкент, мкр. Нурсат, 50' }
  },
  {
    id: 'kazakh-british',
    name: 'Казахстанско-Британский технический университет (KBTU)',
    shortName: 'KBTU',
    location: 'Алматы',
    description: 'Элитный англоязычный вуз, созданный при поддержке BP. Лидер в нефтегазовой инженерии и компьютерных науках. Дипломы признаются в Великобритании.',
    founded: 1999, ranking: 7, students: 3200, tuitionAvg: 'от 2 200 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЕЮА', mission: 'Защита права и справедливости через образование.',
    programs: [
      { name: 'Юриспруденция (Адвокатура)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Юриспруденция (Международное право)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Юриспруденция (Уголовное право)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Московский государственный юридический университет им. О.Е. Кутафина (МГЮА)'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Юридическая клиника с реальными делами", "Сильная программа международного права"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: false, militaryDept: false,
    contacts: { website: 'https://eua.kz', phone: '+7 (727) 279-87-00', email: 'info@eua.kz', address: 'г. Алматы, ул. Наурызбай батыра, 85' }
  },
  {
    id: 'astana-med',
    name: 'Частный медицинский университет Астана (ЧМУ)',
    shortName: 'ЧМУ Астана',
    location: 'Астана',
    description: 'Частный медицинский вуз столицы с современной клинической базой и международно-признанными программами обучения.',
    founded: 2011, ranking: null, students: 2000, tuitionAvg: 'от 1 700 000 ₸',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'АтГУ', mission: 'Кадровое обеспечение Атырауской области.',
    programs: [
      { name: 'Педагогика и психология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Биология', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Астраханский государственный университет'],
    admissionDeadlines: '25.08', category: 'Regional',
    achievements: ["Крупнейший классический вуз Атырауской области"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: true,
    contacts: { website: 'https://atgu.edu.kz', phone: '+7 (7122) 27-45-62', email: 'info@atgu.edu.kz', address: 'г. Атырау, ул. Студенческая, 212' }
  },
  {
    id: 'kazakh-univer-sport',
    name: 'Казахский национальный университет (Институт физической культуры и спорта)',
    shortName: 'КазНУ-ФКС',
    location: 'Алматы',
    description: 'Физкультурный факультет КазНУ. Готовит профессиональных спортсменов, тренеров и менеджеров в области спорта.',
    founded: 1960, ranking: null, students: 1500, tuitionAvg: 'от 700 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Кокше', mission: 'Раскрывать таланты студентов Акмолинской области.',
    programs: [
      { name: 'Педагогика', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Дизайн', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'История', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: [],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Самые низкие цены среди вузов Кокшетау"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://kokshe-acad.kz', phone: '+7 (7162) 72-44-55', email: 'info@kokshe-acad.kz', address: 'г. Кокшетау, ул. Ауезова, 190' }
  },
  {
    id: 'ablai-shymkent',
    name: 'Южно-Казахстанский педагогический университет',
    shortName: 'ЮКПУ',
    location: 'Шымкент',
    description: 'Специализированный педагогический университет Шымкента. Готовит учителей для школ ЮКО и соседних областей.',
    founded: 1931, ranking: null, students: 7000, tuitionAvg: 'от 380 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЗКМУ', mission: 'Медицина с сердцем, наука с разумом.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Стоматология', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
      { name: 'Сестринское дело', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Université Paris-Descartes', 'Варшавский медицинский университет'],
    admissionDeadlines: '25.08', category: 'National',
    achievements: ["Лучший симуляционный медицинский центр в регионе"],
    admissionRequirements: [...DEFAULTS.requirements, "Биология + Химия"],
    admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://zkmu.kz', phone: '+7 (7132) 54-66-26', email: 'info@zkmu.kz', address: 'г. Актобе, пр. Маресьева, 68' }
  },
  {
    id: 'shymkent-tech',
    name: 'Южно-Казахстанский государственный университет (ЮКГУ)',
    shortName: 'ЮКГУ',
    location: 'Шымкент',
    description: 'Технический государственный университет Шымкента. Готовит инженеров для лёгкой, химической и пищевой промышленности юга страны.',
    founded: 1960, ranking: 32, students: 9000, tuitionAvg: 'от 400 000 ₸',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Нархоз Астана', mission: 'Нархоз — в столице, для столицы.',
    programs: [
      { name: 'Финансы и инвестиции', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
      { name: 'Digital Marketing', degree: 'Bachelor', duration: '4 года', language: 'EN' },
      { name: 'Accounting and Audit', degree: 'Bachelor', duration: '4 года', language: 'EN' },
    ],
    partners: ['Penn State University', 'Coventry University'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Европейская аккредитация материнского вуза FIBAA"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: false, militaryDept: false,
    contacts: { website: 'https://narxoz.edu.kz/astana', phone: '+7 (7172) 50-72-00', email: 'astana@narxoz.kz', address: 'г. Астана, пр. Кабанбай батыра, 11' }
  },
  {
    id: 'kazakh-stat',
    name: 'Казахстанский университет инновации и телекоммуникаций (КУИТ)',
    shortName: 'КУИТ',
    location: 'Актобе',
    description: 'Инновационный ИТ-вуз западного Казахстана. Специализируется на программировании, телекоммуникациях и кибербезопасности.',
    founded: 2005, ranking: null, students: 2500, tuitionAvg: 'от 450 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ЕАП', mission: 'Право и справедливость — фундамент государства.',
    programs: [
      { name: 'Юриспруденция', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Международное право', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['Российский университет дружбы народов (РУДН)'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Специализация исключительно на праве"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: false, militaryDept: false,
    contacts: { website: 'https://eurasian-law.kz', phone: '+7 (7172) 57-00-57', email: 'info@eurasian-law.kz', address: 'г. Астана, ул. Сейфуллина, 4' }
  },
  {
    id: 'kokshe-ped',
    name: 'Академия Кокше (педагогический профиль)',
    shortName: 'АК-Пед',
    location: 'Кокшетау',
    description: 'Педагогический вуз Кокшетау. Готовит учителей начальных классов, преподавателей ин. яз. и логопедов.',
    founded: 2003, ranking: null, students: 1800, tuitionAvg: 'от 310 000 ₸',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ВКГПУ', mission: 'Вдохновлять педагогов. Развивать детей.',
    programs: [
      { name: 'Педагогика и методика начального обучения', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Биология и химия (учитель)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Физическая культура и спорт', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Алтайский государственный педагогический университет'],
    admissionDeadlines: '25.08', category: 'Regional',
    achievements: ["Единственный специализированный педагогический вуз в ВКО"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://vkgpu.kz', phone: '+7 (7232) 26-16-73', email: 'info@vkgpu.kz', address: 'г. Усть-Каменогорск, ул. Ленина, 67' }
  },
  {
    id: 'pavlodar-ped',
    name: 'Павлодарский педагогический университет',
    shortName: 'ПавПУ',
    location: 'Павлодар',
    description: 'Педагогический университет Павлодарской области. Готовит учителей для школ северного Казахстана.',
    founded: 2003, ranking: null, students: 3000, tuitionAvg: 'от 360 000 ₸',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KBTU_building_at_night.jpg/800px-KBTU_building_at_night.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'ГМУ Семей', mission: 'Медицина. Наука. Человечность.',
    programs: [
      { name: 'Общая медицина', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU/EN' },
      { name: 'Стоматология', degree: 'Bachelor', duration: '5 лет', language: 'KZ/RU' },
      { name: 'Общественное здравоохранение', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
    ],
    partners: ['Nagasaki University (Япония)', 'WHO'],
    admissionDeadlines: '25.08', category: 'National',
    achievements: ["Уникальная база исследования радиационного воздействия", "Партнёрство с ВОЗ и Университетом Нагасаки"],
    admissionRequirements: [...DEFAULTS.requirements, "Биология + Химия"],
    admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: true, militaryDept: false,
    contacts: { website: 'https://gmu.kz', phone: '+7 (7222) 52-30-44', email: 'info@gmu.kz', address: 'г. Семей, ул. Абая, 103' }
  },
  {
    id: 'sdu-kaz',
    name: 'Казахский национальный университет (Высшая школа экономики и бизнеса)',
    shortName: 'КазНУ-ВШЭиБ',
    location: 'Алматы',
    description: 'Ведущая бизнес-школа при КазНУ им. аль-Фараби. Топовые программы MBA и Executive Education с международной аккредитацией.',
    founded: 2000, ranking: null, students: 2000, tuitionAvg: 'от 1 500 000 ₸',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1569660609-1b7c51e9d1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    ],
    logo: 'Әділет', mission: 'Справедливость — через закон.',
    programs: [
      { name: 'Юриспруденция (гражданское право)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Юриспруденция (уголовно-правовой профиль)', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU' },
      { name: 'Международное частное право', degree: 'Bachelor', duration: '4 года', language: 'KZ/RU/EN' },
    ],
    partners: ['American University Washington College of Law', 'Université Paris II Panthéon-Assas'],
    admissionDeadlines: '25.08', category: 'Private',
    achievements: ["Лучший частный юридический вуз страны по версии Атамекен", "Клиника юридической помощи населению"],
    admissionRequirements: DEFAULTS.requirements, admissionProcedure: DEFAULTS.procedure, scholarships: DEFAULTS.scholarships,
    dormitory: false, militaryDept: false,
    contacts: { website: 'https://adilet.kz', phone: '+7 (727) 378-73-50', email: 'info@adilet.kz', address: 'г. Алматы, ул. Достык, 97А' }
  }
];


export const PROFESSIONS: Profession[] = [
  {
    id: 'backend-dev',
    title: 'Backend Разработчик',
    category: 'IT',
    description: 'Специалист, занимающийся разработкой серверной части веб-приложений, баз данных и API. Отвечает за логику работы сайта, скорость и безопасность данных.',
    salary: { min: 350000, max: 1500000, avg: 650000 },
    demand: 'High',
    skills: ['Python/Java/Go', 'SQL (PostgreSQL)', 'Docker', 'API Design', 'Git'],
    tasks: ['Проектирование архитектуры БД', 'Написание API', 'Оптимизация запросов', 'Настройка серверов'],
    programKeywords: ['Computer Science', 'Software', 'Информационные системы', 'ВТ и ПО']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'IT',
    description: 'Специалист, который собирает, обрабатывает и интерпретирует данные для помощи бизнесу в принятии решений.',
    salary: { min: 300000, max: 1200000, avg: 550000 },
    demand: 'High',
    skills: ['SQL', 'Python (Pandas)', 'Power BI/Tableau', 'Excel', 'Статистика'],
    tasks: ['Сбор и очистка данных', 'Построение дашбордов', 'A/B тестирование', 'Прогнозирование метрик'],
    programKeywords: ['Big Data', 'Mathematics', 'Анализ данных', 'Статистика', 'Информационные системы']
  },
  {
    id: 'petroleum-eng',
    title: 'Инженер-нефтяник',
    category: 'Engineering',
    description: 'Инженер, занимающийся разработкой и эксплуатацией нефтяных и газовых месторождений. Ключевая профессия для экономики Казахстана.',
    salary: { min: 400000, max: 2000000, avg: 800000 },
    demand: 'Medium',
    skills: ['Геология', 'Гидродинамика', 'English (Technical)', 'Бурение', 'HSE'],
    tasks: ['Проектирование скважин', 'Контроль добычи', 'Анализ пластов', 'Работа на месторождении'],
    programKeywords: ['Petroleum', 'Нефтегазовое дело', 'Геология', 'Бурение']
  },
  {
    id: 'surgeon',
    title: 'Хирург',
    category: 'Medical',
    description: 'Врач-специалист, занимающийся лечением заболеваний путем оперативного вмешательства.',
    salary: { min: 250000, max: 1000000, avg: 450000 },
    demand: 'High',
    skills: ['Анатомия', 'Стрессоустойчивость', 'Мелкая моторика', 'Диагностика'],
    tasks: ['Проведение операций', 'Диагностика пациентов', 'Ведение послеоперационного периода'],
    programKeywords: ['Медицина', 'Общая медицина', 'Лечебное дело']
  },
  {
    id: 'marketer',
    title: 'Digital Маркетолог',
    category: 'Business',
    description: 'Специалист по продвижению товаров и услуг в цифровой среде (соцсети, поисковики, медиа).',
    salary: { min: 200000, max: 800000, avg: 400000 },
    demand: 'High',
    skills: ['SMM', 'SEO', 'Targeting', 'Copywriting', 'Analytics'],
    tasks: ['Запуск рекламных кампаний', 'Анализ рынка', 'Ведение соцсетей', 'Создание контент-плана'],
    programKeywords: ['Marketing', 'Маркетинг', 'Management', 'Менеджмент']
  },
  {
    id: 'architect',
    title: 'Архитектор',
    category: 'Creative',
    description: 'Специалист, проектирующий здания, интерьеры и городские пространства.',
    salary: { min: 250000, max: 900000, avg: 420000 },
    demand: 'Medium',
    skills: ['AutoCAD/Revit', '3ds Max', 'Композиция', 'Знание СНиПов'],
    tasks: ['Разработка чертежей', '3D визуализация', 'Авторский надзор', 'Согласование проектов'],
    programKeywords: ['Архитектура', 'Дизайн', 'Architecture']
  },
  {
    id: 'accountant',
    title: 'Бухгалтер',
    category: 'Finance',
    description: 'Специалист по финансовому учету, налогам и отчетности компании.',
    salary: { min: 180000, max: 600000, avg: 300000 },
    demand: 'High',
    skills: ['1C', 'Налоговый кодекс', 'Excel', 'Аудит', 'Внимательность'],
    tasks: ['Ведение учета', 'Сдача налоговой отчетности', 'Расчет зарплат', 'Работа с контрагентами'],
    programKeywords: ['Accounting', 'Учет и аудит', 'Finance', 'Финансы']
  },
  {
    id: 'teacher-math',
    title: 'Учитель математики',
    category: 'Education',
    description: 'Педагог, преподающий математику в школах, колледжах или учебных центрах.',
    salary: { min: 200000, max: 500000, avg: 320000 },
    demand: 'High',
    skills: ['Педагогика', 'Математика', 'Психология', 'Методика преподавания'],
    tasks: ['Проведение уроков', 'Подготовка к ЕНТ/Олимпиадам', 'Проверка работ'],
    programKeywords: ['Mathematics', 'Математика', 'Педагогика']
  },
  {
    id: 'agronomist',
    title: 'Агроном',
    category: 'Agriculture',
    description: 'Специалист сельского хозяйства, занимающийся выращиванием растений и повышением урожайности.',
    salary: { min: 250000, max: 700000, avg: 380000 },
    demand: 'Medium',
    skills: ['Биология', 'Химия', 'Почвоведение', 'Технологии полива'],
    tasks: ['Планирование посевов', 'Защита растений', 'Контроль сбора урожая'],
    programKeywords: ['Агрономия', 'Биотехнология']
  },
  {
    id: 'electrician',
    title: 'Инженер-энергетик',
    category: 'Engineering',
    description: 'Инженер, отвечающий за проектирование, монтаж и эксплуатацию систем электроснабжения.',
    salary: { min: 300000, max: 800000, avg: 450000 },
    demand: 'High',
    skills: ['Электротехника', 'AutoCAD', 'ПБ и ОТ', 'Схемотехника'],
    tasks: ['Проектирование сетей', 'Обслуживание оборудования', 'Энергоаудит'],
    programKeywords: ['Электроэнергетика', 'Теплоэнергетика', 'Power Engineering']
  }
];

export const FEATURES_DATA = [
  { id: 1, title: 'Об университете', desc: 'Миссия, история, лидерство', icon: 'BookOpen' },
  { id: 2, title: 'Академ. программы', desc: 'Перечень специальностей и курсов', icon: 'GraduationCap' },
  { id: 3, title: 'Приём и поступление', desc: 'Требования, сроки, гранты', icon: 'FileCheck' },
  { id: 4, title: 'Фотогалерея', desc: 'Жизнь кампуса в фотографиях', icon: 'ImageIcon' },
  { id: 5, title: 'Международное сотрудничество', desc: 'Обмен, партнеры, стажировки', icon: 'Globe2' },
  { id: 6, title: 'Функция сравнения', desc: 'Анализ и сравнение вузов', icon: 'GitCompare' },
];
