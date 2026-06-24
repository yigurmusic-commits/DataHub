
import React, { useState, useEffect } from 'react';
import { StudentProfile as IStudentProfile, PortfolioItem, AchievementCategory, AIProfileReport } from '../types';
import { User, FileText, Plus, Trash2, Award, Brain, Target, Calendar, UploadCloud, TrendingUp, Sparkles, Loader2, Save } from 'lucide-react';
import { analyzeStudentPortfolio } from '../services/geminiService';
import { TRANSLATIONS } from '../translations';

interface StudentProfileProps {
  initialProfile?: Partial<IStudentProfile>;
  onBack: () => void;
  lang: 'ru' | 'kz' | 'en';
  applicantMode?: 'school' | 'college';
}

// Empty initial data template
const EMPTY_PROFILE: IStudentProfile = {
  score: 0,
  subjectPair: 'Мат-Физ',
  interests: [],
  city: '',
  name: '',
  grade: 11,
  gpa: 0,
  targetUniversities: [],
  portfolio: [],
  bio: ''
};

export const StudentProfile: React.FC<StudentProfileProps> = ({ initialProfile, onBack, lang, applicantMode = 'school' }) => {
  const [profile, setProfile] = useState<IStudentProfile>({ ...EMPTY_PROFILE, ...initialProfile });
  const [isEditing, setIsEditing] = useState(false);
  
  // Update local state when initialProfile prop changes (e.g. coming from Quiz)
  useEffect(() => {
    if (initialProfile) {
      setProfile(prev => ({
        ...prev,
        ...initialProfile,
        // Preserve portfolio if it exists in prev but not in initial, or merge logic if needed
        portfolio: initialProfile.portfolio || prev.portfolio
      }));
    }
  }, [initialProfile]);
  
  // AI State
  const [aiReport, setAiReport] = useState<AIProfileReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Portfolio Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({ category: 'Certificate' });
  const t = TRANSLATIONS[lang];

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeStudentPortfolio(profile, lang);
      if (!result || result.trim().length === 0) {
        throw new Error('Empty AI response');
      }
      const cleaned = result.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      const parsed = JSON.parse(cleaned) as AIProfileReport;
      setAiReport(parsed);
    } catch (e) {
      console.error("Portfolio analysis parse error:", e);
      alert('Не удалось выполнить AI-анализ. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addPortfolioItem = () => {
    if (!newItem.title || !newItem.category) return;
    const item: PortfolioItem = {
      id: Date.now().toString(),
      title: newItem.title,
      category: newItem.category as AchievementCategory,
      date: newItem.date || new Date().toISOString().split('T')[0],
      issuer: newItem.issuer || 'Unknown',
      description: newItem.description
    };
    setProfile(prev => ({ ...prev, portfolio: [...prev.portfolio, item] }));
    setShowAddModal(false);
    setNewItem({ category: 'Certificate' });
  };

  const removePortfolioItem = (id: string) => {
    setProfile(prev => ({ ...prev, portfolio: prev.portfolio.filter(i => i.id !== id) }));
  };

  return (
    <div className="animate-fade-in pb-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 flex items-center gap-1">
          ← Назад
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Профиль студента</h2>
        <div className="w-8"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Personal Info & Portfolio */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Personal Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative">
             <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-3xl font-bold">
                   {profile.name ? profile.name[0] : 'U'}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-2xl font-bold text-gray-900">{profile.name || 'Имя студента'}</h3>
                         <div className="text-gray-500 flex items-center gap-2 mt-1">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">{applicantMode === 'college' ? 'Выпускник колледжа' : `${profile.grade} класс`}</span>
                            {applicantMode === 'school' && <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">GPA {profile.gpa}</span>}
                         </div>
                      </div>
                      <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-brand-600 text-sm font-medium hover:underline"
                      >
                        {isEditing ? 'Готово' : 'Редактировать'}
                      </button>
                   </div>
                   
                   {isEditing ? (
                      <textarea 
                        className="w-full mt-4 p-3 border rounded-lg text-sm"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={3}
                      />
                   ) : (
                      <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                         {profile.bio || 'Расскажите о себе...'}
                      </p>
                   )}

                   <div className="mt-4 flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100 font-medium">
                        {applicantMode === 'school' ? `ЕНТ: ${profile.score || 'Не сдавал'}` : `Средний балл: ${profile.score || 'Не указан'}`}
                      </div>
                      <div className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-100 font-medium">
                        {profile.subjectPair}
                      </div>
                      {profile.city && (
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 font-medium">
                          {profile.city}
                        </div>
                      )}
                   </div>
                   
                   {profile.interests.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.interests.map((int, i) => (
                          <span key={i} className="text-xs text-gray-500">#{int}</span>
                        ))}
                      </div>
                   )}
                </div>
             </div>
          </div>

          {/* 2. Portfolio Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <Award className="w-5 h-5 text-brand-600" /> Портфолио и Достижения
                </h3>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 text-sm bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors font-medium"
                >
                   <Plus className="w-4 h-4" /> Добавить
                </button>
             </div>

             {profile.portfolio.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                   <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                   <p className="text-gray-500 text-sm">Загрузите грамоты, сертификаты или проекты</p>
                </div>
             ) : (
                <div className="space-y-3">
                   {profile.portfolio.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50">
                         <div className={`p-3 rounded-lg shrink-0 ${
                            item.category === 'Olympiad' ? 'bg-yellow-100 text-yellow-600' :
                            item.category === 'Language' ? 'bg-blue-100 text-blue-600' :
                            item.category === 'Project' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-200 text-gray-600'
                         }`}>
                            <FileText className="w-5 h-5" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{item.title}</h4>
                            <div className="flex text-xs text-gray-500 gap-2 mt-0.5">
                               <span>{item.issuer}</span>
                               <span>•</span>
                               <span>{item.date}</span>
                               <span className="px-1.5 py-0.5 bg-white border rounded text-[10px] uppercase tracking-wide">{item.category}</span>
                            </div>
                         </div>
                         <button onClick={() => removePortfolioItem(item.id)} className="text-gray-400 hover:text-red-500 p-2">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   ))}
                </div>
             )}
          </div>

        </div>

        {/* RIGHT COLUMN: AI Analysis */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* AI Action Card */}
           <div className="bg-gradient-to-br from-brand-700 to-indigo-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <Sparkles className="absolute top-2 right-2 text-yellow-300 w-12 h-12 opacity-20" />
              <h3 className="text-xl font-bold mb-2">AI-Аудит Профиля</h3>
              <p className="text-brand-100 text-sm mb-6">
                 Искусственный интеллект проанализирует твое портфолио, найдет слабые места и составит план поступления.
              </p>
              
              <button 
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-white text-brand-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
              >
                 {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
                 {isAnalyzing ? 'Анализирую...' : 'Запустить анализ'}
              </button>
           </div>

           {/* Analysis Results */}
           {aiReport && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-6 animate-fade-in-up">
                 
                 {/* Score */}
                 <div className="text-center pb-4 border-b border-gray-100">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Сила профиля</div>
                    <div className="relative inline-flex items-center justify-center">
                       <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                          <circle cx="48" cy="48" r="40" stroke={aiReport.overallScore > 75 ? '#16a34a' : '#ea580c'} strokeWidth="8" fill="transparent" strokeDasharray={`${aiReport.overallScore * 2.51} 251`} />
                       </svg>
                       <span className="absolute text-2xl font-bold text-gray-800">{aiReport.overallScore}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 px-2 italic">"{aiReport.summary}"</p>
                 </div>

                 {/* Gap Analysis */}
                 <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                       <Target className="w-4 h-4 text-red-500" /> Gap Analysis (Чего не хватает)
                    </h4>
                    <div className="space-y-3">
                       {aiReport.gapAnalysis.map((gap, i) => (
                          <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-100">
                             <div className="text-xs font-bold text-red-800 uppercase mb-1">{gap.target}</div>
                             <ul className="list-disc list-inside text-xs text-red-700 space-y-1">
                                {gap.missing.map((m, idx) => <li key={idx}>{m}</li>)}
                             </ul>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Roadmap */}
                 <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                       <TrendingUp className="w-4 h-4 text-blue-500" /> План развития
                    </h4>
                    <div className="space-y-2">
                       {aiReport.roadmap.map((step, i) => (
                          <div key={i} className="flex gap-3 items-start text-sm">
                             <div className="min-w-[4px] h-full bg-gray-200 rounded-full relative top-1">
                                <div className="absolute top-0 left-[-3px] w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
                             </div>
                             <div>
                                <div className="text-xs text-gray-400 font-medium">{step.period}</div>
                                <div className="text-gray-700">{step.action}</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Essay Topics */}
                 <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                       <FileText className="w-4 h-4 text-purple-500" /> Идеи для Эссе
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {aiReport.essayTopics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg border border-purple-100">
                             {topic}
                          </span>
                       ))}
                    </div>
                 </div>

              </div>
           )}

        </div>
      </div>

      {/* MODAL: Add Portfolio Item */}
      {showAddModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
               <h3 className="text-xl font-bold mb-4">Добавить достижение</h3>
               
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                     <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="Например: IELTS Certificate"
                        value={newItem.title || ''}
                        onChange={e => setNewItem({...newItem, title: e.target.value})}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                        <select 
                           className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                           value={newItem.category}
                           onChange={e => setNewItem({...newItem, category: e.target.value as AchievementCategory})}
                        >
                           <option value="Certificate">Сертификат</option>
                           <option value="Olympiad">Олимпиада</option>
                           <option value="Project">Проект</option>
                           <option value="Sport">Спорт</option>
                           <option value="Language">Язык</option>
                           <option value="Volunteering">Волонтерство</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                        <input 
                           type="date" 
                           className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                           value={newItem.date || ''}
                           onChange={e => setNewItem({...newItem, date: e.target.value})}
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Организация / Кем выдано</label>
                     <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                        placeholder="Например: British Council"
                        value={newItem.issuer || ''}
                        onChange={e => setNewItem({...newItem, issuer: e.target.value})}
                     />
                  </div>

                  {/* Simulated File Upload */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Файл (Скан/Фото)</label>
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-500">Нажмите, чтобы загрузить файл (Симуляция)</span>
                     </div>
                  </div>
               </div>

               <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">Отмена</button>
                  <button onClick={addPortfolioItem} className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700">Сохранить</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
