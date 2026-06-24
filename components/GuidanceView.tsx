import React, { useState, useEffect } from 'react';
import { UserProfile, University, AITwinResponse } from '../types';
import { UNIVERSITIES } from '../constants';
import { analyzeProfileWithAI } from '../services/geminiService';
import { Loader2, Sparkles, Target, TrendingUp, CheckCircle, ArrowRight, AlertTriangle, User, Brain, GraduationCap, Briefcase, Coins, AlertCircle, Megaphone } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { SkeletonCard } from './SkeletonCard';

interface GuidanceViewProps {
  profile: UserProfile;
  onBack: () => void;
  onUniClick: (uni: University) => void;
  lang: 'ru' | 'kz' | 'en';
}

type TabType = 'unis' | 'twin';

export const GuidanceView: React.FC<GuidanceViewProps> = ({ profile, onBack, onUniClick, lang }) => {
  const [data, setData] = useState<AITwinResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('unis');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jsonString = await analyzeProfileWithAI(profile, lang);
        if (!jsonString || jsonString.trim().length === 0) {
          throw new Error('Empty response from AI');
        }
        const cleaned = jsonString.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        setData(JSON.parse(cleaned) as AITwinResponse);
      } catch (e) {
        console.error("Failed to parse AI guidance:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profile, lang]);

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div>
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <SkeletonCard key={i} lines={3} showImage className="shadow-sm" />
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-4 animate-pulse">
          🤖 {t.loading_desc || 'Анализируем ваш профиль с помощью AI...'}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-gray-900">Ошибка анализа</h3>
        <button onClick={onBack} className="mt-4 text-brand-600 hover:underline">Вернуться назад</button>
      </div>
    );
  }

  const getGrantColor = (chance: number) => {
    if (chance >= 80) return 'text-green-600 bg-green-50 border-green-100';
    if (chance >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm mb-2 flex items-center gap-1 transition-colors">
           ← {t.back_to_list}
        </button>
        <div className="flex items-center gap-3">
            <div className="bg-brand-600 text-white p-2 rounded-lg shadow-md">
                <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                  {t.guidance_title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Подобрано на основе {profile.score} баллов и профиля "{profile.subjectPair}"
              </p>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-full md:w-auto md:inline-flex">
         <button 
           onClick={() => setActiveTab('unis')}
           className={`flex-1 md:flex-none md:w-48 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'unis' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
         >
           <GraduationCap className="w-4 h-4" /> {t.tab_unis}
         </button>
         <button 
           onClick={() => setActiveTab('twin')}
           className={`flex-1 md:flex-none md:w-48 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'twin' ? 'bg-white shadow text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
         >
           <Brain className="w-4 h-4" /> {t.tab_twin}
         </button>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-3/4">
          
          {/* --- TAB 1: UNIVERSITIES (Primary) --- */}
          {activeTab === 'unis' && (
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
               {data.recommendations.map((rec, idx) => {
                  const uni = UNIVERSITIES.find(u => u.id === rec.uniId);
                  if (!uni) return null;

                  return (
                     <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col md:flex-row relative group">
                        {/* Badge */}
                        {idx === 0 && (
                            <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-br-xl z-20">
                                Топ выбор
                            </div>
                        )}
                        
                        {/* Left: Image & Basic Info */}
                        <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                           <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm">
                              #{uni.ranking} Рейтинг
                           </div>
                        </div>

                        {/* Right: Twin Predictions */}
                        <div className="flex-1 p-6 flex flex-col">
                           <div className="flex justify-between items-start mb-2">
                              <div>
                                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{uni.name}</h3>
                                 <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                                    <GraduationCap className="w-4 h-4" /> {rec.programName}
                                 </p>
                              </div>
                              <div className="text-right shrink-0 ml-4">
                                 <div className="text-2xl font-bold text-brand-600">{rec.matchPercentage}%</div>
                                 <div className="text-xs text-gray-400">Совместимость</div>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5">
                              <div className={`p-3 rounded-xl border ${getGrantColor(rec.grantChance)}`}>
                                 <div className="text-xs opacity-70 mb-1">{t.pred_grant}</div>
                                 <div className="text-lg font-bold">{rec.grantChance}%</div>
                              </div>
                              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700">
                                 <div className="text-xs opacity-70 mb-1">{t.pred_job}</div>
                                 <div className="text-lg font-bold flex items-center gap-1">
                                    <Briefcase className="w-4 h-4" /> {rec.employmentChance}%
                                 </div>
                              </div>
                              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 col-span-2 md:col-span-1">
                                 <div className="text-xs opacity-70 mb-1">{t.pred_salary}</div>
                                 <div className="text-lg font-bold flex items-center gap-1">
                                    <Coins className="w-4 h-4" /> {rec.salaryForecast}
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-3 mb-6 flex-1">
                              <div className="text-sm text-gray-600 flex gap-2">
                                 <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                                 <span>{rec.reason}</span>
                              </div>
                              <div className="text-sm text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-100 flex gap-2 items-start">
                                 <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> 
                                 <span>{rec.risk}</span>
                              </div>
                           </div>

                           <button 
                              onClick={() => onUniClick(uni)}
                              className="w-full mt-auto bg-gray-900 text-white py-3 rounded-xl hover:bg-brand-600 transition-colors font-medium flex items-center justify-center gap-2 group-hover:gap-3"
                           >
                              {t.details} <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
          )}

          {/* --- TAB 2: TWIN PROFILE (Secondary) --- */}
          {activeTab === 'twin' && (
            <div className="space-y-6 animate-fade-in">
               {/* Info Banner */}
               <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-indigo-800 text-sm">
                 <Sparkles className="w-5 h-5 shrink-0" />
                 <p>Эта аналитика показывает, как студенты с профилем, похожим на ваш ({profile.score} баллов, {profile.subjectPair}), справлялись с поступлением в прошлые годы.</p>
               </div>

               {/* Top Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                     <div className="relative z-10">
                        <div className="text-indigo-100 text-sm font-medium mb-1">{t.twin_found}</div>
                        <div className="text-3xl font-bold">{data.twinStats.foundCount}</div>
                        <div className="text-xs text-indigo-100 mt-2 opacity-80">Похожих студентов</div>
                     </div>
                     <User className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white opacity-10" />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                     <div className="text-gray-500 text-sm font-medium mb-1">{t.twin_avg_score}</div>
                     <div className="text-3xl font-bold text-gray-900">{data.twinStats.avgScore}</div>
                     <div className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> 
                        {data.twinStats.avgScore > profile.score ? `Выше вашего на ${data.twinStats.avgScore - profile.score}` : 'Близко к вашему'}
                     </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm md:col-span-2 lg:col-span-1">
                     <div className="text-gray-500 text-sm font-medium mb-1">{t.twin_success}</div>
                     <div className="text-lg font-bold text-brand-600 leading-tight">{data.twinStats.successRate}</div>
                  </div>
               </div>

               {/* Profile Analysis */}
               <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Brain className="w-5 h-5 text-gray-400" /> Детальный анализ профиля
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <div className="mb-4">
                           <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{t.twin_level}</span>
                           <div className="mt-1 text-xl font-medium text-gray-800">{data.twinProfile.academicLevel}</div>
                        </div>
                        <div>
                           <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Стиль обучения</span>
                           <p className="mt-1 text-gray-600 leading-relaxed text-sm">
                              "{data.twinProfile.learningStyle}"
                           </p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div>
                           <div className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" /> {t.twin_strengths}
                           </div>
                           <div className="flex flex-wrap gap-2">
                              {data.twinProfile.strengths.map((s, i) => (
                                 <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100">{s}</span>
                              ))}
                           </div>
                        </div>
                        <div>
                           <div className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> {t.twin_weaknesses}
                           </div>
                           <div className="flex flex-wrap gap-2">
                              {data.twinProfile.weaknesses.map((s, i) => (
                                 <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100">{s}</span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (Ad) */}
        <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-1.5 rounded">
                    {t.ad_title}
                </div>
                <div className="bg-white p-4 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <Megaphone className="w-6 h-6 text-brand-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{t.ad_placeholder}</h4>
                <p className="text-xs text-gray-500 mb-4">{t.ad_desc}</p>
                <button className="text-sm font-medium text-brand-600 hover:text-brand-700 underline decoration-dotted">
                    {t.ad_btn}
                </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3 text-left">
                <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">
                    <strong>Дисклеймер:</strong> "AI Twin" — это статистическая модель. Реальные результаты зависят от подготовки и конкуренции.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};
