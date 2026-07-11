
export interface AcademicProgram {
  name: string;
  degree: 'Bachelor' | 'Master' | 'PhD';
  duration: string;
  language: string;
  description?: string; // Added description
  tuition?: string; // Specific tuition for program if needed
}

export interface Review {
  id: string;
  author: string;
  role: 'Student' | 'Alumni' | 'Parent';
  rating: number; // 1-5
  date: string;
  text: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
  founded: number;
  ranking: number; // Local ranking
  students: number;
  tuitionAvg: string; // in KZT
  image: string;
  gallery?: string[];
  logo: string;
  mission: string;
  programs: AcademicProgram[];
  partners: string[];
  admissionDeadlines: string;
  category?: 'National' | 'State' | 'Private' | 'Medical' | 'Specialized' | 'International' | 'Regional' | 'Military';
  tourUrl?: string;
  
  // New Detailed Fields
  achievements?: string[];
  admissionRequirements?: string[];
  admissionProcedure?: string[];
  scholarships?: string[];
  dormitory?: boolean;
  militaryDept?: boolean;
  
  // New Double Degree Field
  doubleDegree?: {
    partner: string;
    program: string;
    country?: string;
  }[];
  
  // Contact Info
  contacts?: {
    website?: string;
    phone?: string;
    email?: string;
    address?: string;
  };

  // Reviews
  reviews?: Review[];
}

export interface Profession {
  id: string;
  title: string;
  category: string;
  description: string;
  salary: {
    min: number;
    max: number;
    avg: number;
  };
  demand: 'High' | 'Medium' | 'Low';
  skills: string[];
  tasks: string[];
  // Keywords to match with University Programs
  programKeywords: string[]; 
}

export type ViewState = 'home' | 'details' | 'compare' | 'guidance' | 'professions' | 'profession-details' | 'profile' | 'scholarships';
export type Language = 'ru' | 'kz' | 'en';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface UserProfile {
  score: number;
  subjectPair: string;
  interests: string[];
  city: string;
}

// --- NEW: Student Profile & Portfolio Types ---

export type AchievementCategory = 'Olympiad' | 'Sport' | 'Volunteering' | 'Certificate' | 'Project' | 'Language';

export interface PortfolioItem {
  id: string;
  title: string;
  category: AchievementCategory;
  date: string;
  issuer: string; // Who gave it (e.g., "IELTS", "Republican Olympiad")
  description?: string;
  fileUrl?: string; // Simulated URL
  fileName?: string;
}

export interface StudentProfile extends UserProfile {
  name: string;
  grade: number; // 9, 10, 11, 12
  gpa: number; // 5.0 scale
  targetUniversities: string[]; // IDs of universities
  portfolio: PortfolioItem[];
  bio?: string;
}

// --- NEW: AI Profile Analysis Types ---

export interface AIProfileReport {
  overallScore: number; // 0-100 strength score
  summary: string;
  gapAnalysis: {
    target: string;
    missing: string[];
  }[];
  roadmap: {
    period: string;
    action: string;
    impact: 'High' | 'Medium';
  }[];
  essayTopics: string[];
}

// --- AI Twin Specific Types ---

export interface TwinProfileAnalysis {
  academicLevel: string;
  strengths: string[];
  weaknesses: string[];
  learningStyle: string;
}

export interface TwinStats {
  foundCount: number;
  avgScore: number;
  successRate: string; // e.g. "89% поступили на грант"
  similarInterests: string[];
}

export interface TwinRecommendation {
  uniId: string;
  programName: string;
  matchPercentage: number;
  grantChance: number; // Percentage 0-100
  employmentChance: number; // Percentage 0-100
  salaryForecast: string;
  reason: string;
  risk: string;
}

export interface AITwinResponse {
  twinProfile: TwinProfileAnalysis;
  twinStats: TwinStats;
  recommendations: TwinRecommendation[];
}
