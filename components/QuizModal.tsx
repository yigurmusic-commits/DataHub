import React, { useState, useMemo } from 'react';
import { X, ChevronRight, Check, GraduationCap, Calculator, BookOpen, Heart, MapPin } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { UserProfile } from '../types';
import { UNIVERSITIES } from '../constants';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: UserProfile) => void;
  lang: 'ru' | 'kz' | 'en';
  applicantMode?: 'school' | 'college';
}

const SUBJECT_PAIRS = [
  "Мат-Физ", "Био-Хим", "География-Мат", "Всемирная-Английский", 
  "География-Биология", "Русский-Литература", "Творческий"
];

const COLLEGE_FIELDS = [
  "IT и Программирование", "Экономика и Учет", "Педагогика", 
  "Медицина", "Строительство", "Транспорт и Логистика", "Дизайн"
];

const INTERESTS = [
  "IT & Technologies", "Медицина", "Инженерия", "Педагогика", 
  "Бизнес & Финансы", "Право", "Творчество & Дизайн", "Наука"
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSubmit, lang, applicantMode = 'school' }) => {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(applicantMode === 'school' ? 80 : 4.0);
  const [subject, setSubject] = useState('');
  const [city, setCity] = useState(''); // Empty initially
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const t = TRANSLATIONS[lang];

  // Extract unique cities from constants
  const cities = useMemo(() => {
    const locs = Array.from(new Set(UNIVERSITIES.map(u => u.location))).sort();
    return [t.quiz_any_city, ...locs];
  }, [t]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    const finalCity = city === t.quiz_any_city ? 'Не важно' : city;
    const profile: UserProfile = {
      score,
      subjectPair: subject,
      interests: selectedInterests,
      city: finalCity
    };
    onSubmit(profile);
    onClose();
    // Reset after closing
    setTimeout(() => {
      setStep(1);
      setScore(applicantMode === 'school' ? 80 : 4.0);
      setSubject('');
      setCity('');
      setSelectedInterests([]);
    }, 500);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests(prev => [...prev, interest]);
      }
    }
  };

  const isStepValid = () => {
    if (step === 1) return applicantMode === 'school' ? (score >= 0 && score <= 140) : (score >= 2.0 && score <= 5.0);
    if (step === 2) return subject !== '';
    if (step === 3) return city !== '';
    if (step === 4) return selectedInterests.length > 0;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-brand-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold text-lg">{t.quiz_title}</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 h-1.5 w-full">
          <div 
            className="bg-brand-500 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {applicantMode === 'school' ? t.quiz_step1_q : 'Какой у вас средний балл (GPA) диплома колледжа?'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {applicantMode === 'school' 
                    ? 'Укажите ваш ориентировочный или точный балл ЕНТ' 
                    : 'Укажите ваш средний балл по 5-балльной или 4-балльной шкале'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <span className="text-5xl font-bold text-brand-600">{score.toFixed(applicantMode === 'school' ? 0 : 1)}</span>
                <input 
                  type="range" 
                  min={applicantMode === 'school' ? "0" : "2.0"} 
                  max={applicantMode === 'school' ? "140" : "5.0"} 
                  step={applicantMode === 'school' ? "1" : "0.1"}
                  value={score} 
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between w-full text-xs text-gray-400 px-1">
                  <span>{applicantMode === 'school' ? '0' : '2.0'}</span>
                  <span>{applicantMode === 'school' ? '70 (Порог)' : '3.5 (Хорошо)'}</span>
                  <span>{applicantMode === 'school' ? '140' : '5.0'}</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {applicantMode === 'school' ? t.quiz_step2_q : 'Какое направление вы окончили в колледже?'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {applicantMode === 'school' ? 'Выберите вашу пару профильных предметов' : 'Выберите профиль вашего диплома'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(applicantMode === 'school' ? SUBJECT_PAIRS : COLLEGE_FIELDS).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                      subject === s 
                      ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-200' 
                      : 'border-gray-200 hover:border-brand-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-sm">{s}</span>
                    {subject === s && <Check className="w-4 h-4 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
               <div className="text-center">
                <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.quiz_step_city}</h3>
                <p className="text-gray-500 text-sm">В каком городе вы планируете учиться?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cities.map((c) => (
                   <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                      city === c 
                      ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-200' 
                      : 'border-gray-200 hover:border-brand-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-sm truncate">{c}</span>
                    {city === c && <Check className="w-4 h-4 text-brand-600 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
               <div className="text-center">
                <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.quiz_step3_q}</h3>
                <p className="text-gray-500 text-sm">Что вам интересно? (Макс. 3)</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {INTERESTS.map((int) => {
                  const isSelected = selectedInterests.includes(int);
                  return (
                    <button
                      key={int}
                      onClick={() => toggleInterest(int)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {int}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="flex gap-1">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-brand-600' : 'bg-gray-300'}`} />
             ))}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
              !isStepValid() 
              ? 'bg-gray-300 cursor-not-allowed opacity-70' 
              : 'bg-brand-600 hover:bg-brand-700 hover:scale-105 active:scale-95'
            }`}
          >
            {step === 4 ? t.quiz_finish : t.quiz_next}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
