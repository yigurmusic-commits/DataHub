
import React from 'react';
import { Profession, University } from '../types';
import { UNIVERSITIES } from '../constants';
import { ArrowLeft, Briefcase, TrendingUp, CheckCircle, GraduationCap, MapPin, ChevronRight, DollarSign, Wallet, Star, Calendar } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { RoiCalculator } from './RoiCalculator';

interface ProfessionDetailProps {
  profession: Profession;
  onBack: () => void;
  onUniClick: (uni: University) => void;
  lang?: 'ru' | 'kz' | 'en';
}

export const ProfessionDetail: React.FC<ProfessionDetailProps> = ({ profession, onBack, onUniClick, lang = 'ru' }) => {
  const t = TRANSLATIONS[lang];

  // Find universities that match the profession keywords
  const matchedUniversities = UNIVERSITIES.filter(uni => 
    uni.programs.some(prog => 
      profession.programKeywords.some(keyword => 
        prog.name.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  );

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT', maximumSignificantDigits: 3 }).format(amount);
  };

  const demandColor = {
    High: 'text-green-600 bg-green-50 border-green-100',
    Medium: 'text-yellow-600 bg-yellow-50 border-yellow-100',
    Low: 'text-red-600 bg-red-50 border-red-100'
  };

  const demandText = {
    High: t.prof_high,
    Medium: t.prof_medium,
    Low: t.prof_low
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in pb-10">
       {/* Header */}
       <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 relative overflow-hidden">
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all z-20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="relative z-10 mt-6">
             <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
                {profession.category}
             </div>
             <h1 className="text-3xl md:text-4xl font-bold mb-4">{profession.title}</h1>
             <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">{profession.description}</p>
          </div>

          <Briefcase className="absolute right-[-20px] bottom-[-40px] w-64 h-64 text-white opacity-5" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
             {/* Key Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-5 rounded-2xl">
                   <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                      <Wallet className="w-5 h-5" /> {t.prof_salary_avg}
                   </div>
                   <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatMoney(profession.salary.avg)}</div>
                   <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatMoney(profession.salary.min)} — {formatMoney(profession.salary.max)}
                   </div>
                </div>

                <div className={`p-5 rounded-2xl border ${demandColor[profession.demand]} dark:bg-gray-800/40`}>
                   <div className="flex items-center gap-2 mb-2 font-semibold opacity-80">
                      <TrendingUp className="w-5 h-5" /> {t.prof_demand}
                   </div>
                   <div className="text-2xl font-bold">{demandText[profession.demand]}</div>
                   <div className="text-sm opacity-70 mt-1">
                      {lang === 'ru' ? 'На рынке труда РК' : lang === 'kz' ? 'ҚР еңбек нарығында' : 'In the labor market of RK'}
                   </div>
                </div>
             </div>

             {/* Visual Salary Range Chart */}
             <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                   <Wallet className="w-4 h-4 text-emerald-500" />
                   {lang === 'ru' ? 'Визуализация диапазона зарплат' : lang === 'kz' ? 'Жалақы диапазонын визуализациялау' : 'Salary Range Visualization'}
                </h4>
                
                <div className="space-y-6">
                   {/* Range Bar */}
                   <div className="relative pt-4">
                      {/* Bar Background */}
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-full" />
                      </div>
                      
                      {/* Avg Marker Pin */}
                      <div 
                         className="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center group"
                         style={{ 
                            left: `${Math.max(10, Math.min(90, ((profession.salary.avg - profession.salary.min) / (profession.salary.max - profession.salary.min)) * 100))}%` 
                         }}
                      >
                         <div className="bg-emerald-600 dark:bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md mb-1 whitespace-nowrap">
                            {lang === 'ru' ? 'Средняя' : lang === 'kz' ? 'Орташа' : 'Average'}
                         </div>
                         <div className="w-3.5 h-3.5 bg-white border-2 border-emerald-600 dark:border-emerald-500 rounded-full" />
                      </div>
                   </div>

                   {/* Labels */}
                   <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <div>
                         <span className="block text-[10px] text-gray-400">{lang === 'ru' ? 'Мин.' : lang === 'kz' ? 'Мин.' : 'Min.'}</span>
                         <span>{formatMoney(profession.salary.min)}</span>
                      </div>
                      <div className="text-right">
                         <span className="block text-[10px] text-gray-400">{lang === 'ru' ? 'Макс.' : lang === 'kz' ? 'Макс.' : 'Max.'}</span>
                         <span>{formatMoney(profession.salary.max)}</span>
                      </div>
                   </div>
                </div>

                {/* Career Growth Forecast */}
                <div className="mt-6 border-t border-gray-200/60 dark:border-gray-700 pt-6">
                   <h5 className="font-bold text-sm text-gray-800 dark:text-gray-300 mb-4">
                      {lang === 'ru' ? 'Прогноз карьерного роста (опыт работы)' : lang === 'kz' ? 'Мансаптық өсу болжамы' : 'Career Growth Forecast'}
                   </h5>
                   <div className="space-y-4">
                      {/* Junior */}
                      <div className="space-y-1">
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Junior (0 - 2 {lang === 'ru' ? 'года' : lang === 'kz' ? 'жыл' : 'years'})</span>
                            <span className="font-bold text-gray-700 dark:text-gray-300">{formatMoney(profession.salary.min)}</span>
                         </div>
                         <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/50 rounded-full" style={{ width: '40%' }} />
                         </div>
                      </div>
                      {/* Middle */}
                      <div className="space-y-1">
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Middle (2 - 5 {lang === 'ru' ? 'лет' : lang === 'kz' ? 'жыл' : 'years'})</span>
                            <span className="font-bold text-gray-700 dark:text-gray-300">{formatMoney(profession.salary.avg)}</span>
                         </div>
                         <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/80 rounded-full" style={{ width: '70%' }} />
                         </div>
                      </div>
                      {/* Senior */}
                      <div className="space-y-1">
                         <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Senior (5+ {lang === 'ru' ? 'лет' : lang === 'kz' ? 'жыл' : 'years'})</span>
                            <span className="font-bold text-gray-700 dark:text-gray-300">{formatMoney(profession.salary.max * 1.25)}</span>
                         </div>
                         <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Skills & Tasks */}
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" /> {t.prof_tasks}
                   </h3>
                   <ul className="space-y-3">
                      {profession.tasks.map((task, idx) => (
                         <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100/50 dark:border-gray-750">
                            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-2 shrink-0" />
                            <span className="text-sm">{task}</span>
                         </li>
                      ))}
                   </ul>
                </div>
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" /> {t.prof_skills}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {profession.skills.map((skill, idx) => (
                         <span key={idx} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 font-medium text-sm rounded-lg border border-purple-100 dark:border-purple-900/50">
                            {skill}
                         </span>
                      ))}
                   </div>
                </div>
             </div>

             {/* ROI Calculator Integration */}
             <div className="pt-4">
                <RoiCalculator
                   lang={lang}
                   defaultSalary={profession.salary.avg}
                   programName={profession.title}
                />
             </div>
          </div>

          {/* Sidebar: Where to Study */}
          <div className="lg:col-span-1">
             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                   <GraduationCap className="w-5 h-5 text-brand-600" /> {t.prof_where_to_study}
                </h3>
                
                {matchedUniversities.length > 0 ? (
                   <div className="space-y-3">
                      {matchedUniversities.map(uni => (
                         <div 
                           key={uni.id} 
                           onClick={() => onUniClick(uni)}
                           className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group"
                         >
                            <div className="font-bold text-gray-800 text-sm group-hover:text-brand-600 transition-colors">
                               {uni.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                               <MapPin className="w-3 h-3" /> {uni.location}
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-600">
                               Подробнее <ChevronRight className="w-3 h-3" />
                            </div>
                         </div>
                      ))}
                   </div>
                ) : (
                   <div className="text-center py-8 text-gray-500 text-sm">
                      Вузы с подходящими программами не найдены в нашей базе.
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};
