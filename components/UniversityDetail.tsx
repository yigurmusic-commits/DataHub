
import React, { useState } from 'react';
import { University } from '../types';
import { MapPin, Calendar, Users, Award, BookOpen, ArrowLeft, Box, ExternalLink, Trophy, FileText, CheckCircle, ListOrdered, Coins, ChevronDown, ChevronUp, Gift, Phone, Globe, Mail, Heart, Share2, ImageIcon, ScrollText, MessageSquare, Sparkles } from 'lucide-react';
import { ReviewsSection } from './ReviewsSection';
import { TRANSLATIONS } from '../translations';

interface UniversityDetailProps {
  university: University;
  onBack: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  lang?: 'ru' | 'kz' | 'en';
  onAskAI?: (text: string) => void;
}

export const UniversityDetail: React.FC<UniversityDetailProps> = ({ university, onBack, isSaved = false, onToggleSave, lang = 'ru', onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews' | 'media'>('info');
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const t = TRANSLATIONS[lang];

  // Load checklist state from localStorage
  const [prepStatus, setPrepStatus] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`datahub_prep_${university.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleRequirement = (req: string) => {
    const updated = {
      ...prepStatus,
      [req]: !prepStatus[req]
    };
    setPrepStatus(updated);
    try {
      localStorage.setItem(`datahub_prep_${university.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleProgram = (idx: number) => {
    setExpandedProgram(expandedProgram === idx ? null : idx);
  };

  const handleShare = () => {
    const text = `Посмотри этот университет: ${university.name} - ${university.location}`;
    navigator.clipboard.writeText(text);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in relative">
      {/* Toast Notification */}
      {showShareToast && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium animate-fade-in shadow-lg flex items-center gap-2">
             <CheckCircle className="w-4 h-4 text-green-400" /> Ссылка скопирована
          </div>
      )}

      {/* Header Image */}
      <div className="h-64 md:h-80 relative bg-gray-900 group">
        <img 
          src={university.image} 
          alt={university.name} 
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        {/* Navigation & Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all"
            >
            <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
                <button 
                    onClick={handleShare}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all"
                    title="Поделиться"
                >
                    <Share2 className="w-5 h-5" />
                </button>
                {onToggleSave && (
                    <button 
                        onClick={onToggleSave}
                        className={`p-2 rounded-full transition-all backdrop-blur-md ${isSaved ? 'bg-white text-red-500' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        title={isSaved ? "Убрать из избранного" : "В избранное"}
                    >
                        <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                )}
            </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-brand-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
              {university.shortName}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
              <MapPin className="w-3 h-3" /> {university.location}
            </span>
            {university.category && (
               <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium border border-white/10">
                 {t[`cat_${university.category}` as keyof typeof t]}
               </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">{university.name}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-4 px-4 text-center font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'info' ? 'text-brand-600 border-brand-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
        >
          {t.info_tab}
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 py-4 px-4 text-center font-medium transition-colors border-b-2 flex justify-center items-center gap-2 whitespace-nowrap ${activeTab === 'reviews' ? 'text-brand-600 border-brand-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
        >
          <MessageSquare className="w-4 h-4" /> {t.reviews_tab}
        </button>
        <button 
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-4 px-4 text-center font-medium transition-colors border-b-2 flex justify-center items-center gap-2 whitespace-nowrap ${activeTab === 'media' ? 'text-brand-600 border-brand-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
        >
          <ImageIcon className="w-4 h-4" /> {t.gallery_tab}
        </button>
      </div>

      {/* Content */}
      <div className="p-0 md:p-0 min-h-[400px]">
        
        {/* TAB: INFO */}
        {activeTab === 'info' && (
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Description & Mission */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">О ВУЗе</h3>
                <p className="text-gray-600 leading-relaxed">{university.description}</p>
                <div className="mt-4 p-4 bg-brand-50 rounded-lg border border-brand-100 flex gap-3">
                   <div className="bg-brand-100 p-2 rounded-full h-fit text-brand-600"><Award className="w-5 h-5"/></div>
                   <div>
                      <h4 className="text-brand-800 font-semibold text-sm mb-1">Миссия</h4>
                      <p className="text-brand-600 text-sm italic">"{university.mission}"</p>
                   </div>
                </div>
              </section>

              {/* Achievements */}
              {university.achievements && university.achievements.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" /> Достижения
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {university.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Double Degree Programs */}
              {university.doubleDegree && university.doubleDegree.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-indigo-600" /> Программы двойного диплома
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {university.doubleDegree.map((dd, idx) => (
                      <div key={idx} className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 z-0 group-hover:bg-indigo-100 transition-colors"></div>
                         <div className="relative z-10">
                           <div className="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-1">Партнер</div>
                           <div className="font-bold text-gray-800 mb-2">{dd.partner}</div>
                           <div className="flex items-center gap-2 text-sm text-gray-600">
                              <BookOpen className="w-3 h-3" />
                              <span className="truncate">{dd.program}</span>
                           </div>
                           {dd.country && (
                              <div className="absolute top-2 right-2 text-xs font-bold text-indigo-300 bg-white px-1 rounded shadow-sm">
                                {dd.country}
                              </div>
                           )}
                         </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Academic Programs */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-brand-600" /> Академические программы
                </h3>
                <div className="space-y-3">
                  {university.programs.map((prog, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-brand-300 transition-colors">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
                        onClick={() => toggleProgram(idx)}
                      >
                         <div>
                            <div className="font-bold text-gray-800">{prog.name}</div>
                            <div className="text-xs text-gray-500 mt-1 flex gap-2">
                               <span className="bg-gray-100 px-2 py-0.5 rounded">{prog.degree}</span>
                               <span className="bg-gray-100 px-2 py-0.5 rounded">{prog.language}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{prog.duration}</span>
                            {expandedProgram === idx ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                         </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedProgram === idx && (
                         <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-600 space-y-2 animate-fade-in">
                            <p>{prog.description || "Описание программы уточняйте в приемной комиссии."}</p>
                            {prog.tuition && (
                               <div className="flex items-center gap-2 font-medium text-green-700">
                                  <Coins className="w-4 h-4" /> Стоимость: {prog.tuition}
                               </div>
                            )}
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Admission Section */}
              <section className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Поступление
                 </h3>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                    <div>
                       <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                          <CheckCircle className="w-4 h-4 text-green-600" /> Требования
                       </h4>
                        <ul className="space-y-2">
                           {university.admissionRequirements?.map((req, i) => {
                              const isChecked = !!prepStatus[req];
                              return (
                                 <li key={i} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-indigo-100/50 dark:border-gray-700 shadow-sm transition-all hover:border-indigo-200 dark:hover:border-gray-650">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                       <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => toggleRequirement(req)}
                                          className="w-4 h-4 text-indigo-600 dark:text-brand-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer shrink-0"
                                       />
                                       <span className={`text-xs font-semibold leading-snug break-words ${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
                                          {req}
                                       </span>
                                    </div>
                                    {onAskAI && (
                                       <button
                                          onClick={() => {
                                             let prompt = '';
                                             if (lang === 'ru') {
                                                prompt = `Как подготовиться к требованию "${req}" для поступления в ${university.name}? Расскажи подробно о шагах, лайфхаках и дай примеры, если применимо.`;
                                             } else if (lang === 'kz') {
                                                prompt = `${university.name} университетіне түсу үшін "${req}" талабына қалай дайындалу керек? Қадамдары, лайфхактар мен мысалдар туралы егжей-тегжейлі айтып берші.`;
                                             } else {
                                                prompt = `How to prepare for the requirement "${req}" to enter ${university.name}? Explain in detail the steps, tips, and provide examples if applicable.`;
                                             }
                                             onAskAI(prompt);
                                          }}
                                          className="flex items-center gap-1 text-[10px] font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900 border border-brand-100 dark:border-brand-900 px-2 py-0.5 rounded-lg shrink-0 transition-colors"
                                          title="ИИ Помощник"
                                       >
                                          <Sparkles className="w-3 h-3 text-brand-500 dark:text-brand-400 animate-pulse" />
                                          <span>ИИ</span>
                                       </button>
                                    )}
                                 </li>
                              );
                           }) || <li className="text-sm text-gray-500">Информация обновляется</li>}
                        </ul>
                    </div>

                    <div>
                       <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                          <ListOrdered className="w-4 h-4 text-blue-600" /> Процедура
                       </h4>
                       <ol className="space-y-3 relative border-l border-blue-200 ml-1.5">
                          {university.admissionProcedure?.map((step, i) => (
                             <li key={i} className="ml-4 text-sm text-gray-700">
                                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 ring-blue-200"></span>
                                {step}
                             </li>
                          )) || <li className="ml-4 text-sm text-gray-500">Информация обновляется</li>}
                       </ol>
                    </div>
                 </div>
              </section>

              {/* Financial Aid */}
              <section>
                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-500" /> Стипендии и Гранты
                 </h3>
                 <div className="grid gap-3">
                    {university.scholarships?.map((scholarship, i) => (
                       <div key={i} className="flex items-center gap-3 p-4 bg-pink-50/50 border border-pink-100 rounded-xl">
                          <Coins className="w-5 h-5 text-pink-500 shrink-0" />
                          <span className="text-gray-800 font-medium">{scholarship}</span>
                       </div>
                    ))}
                 </div>
              </section>

            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
                <h4 className="font-bold text-gray-900 mb-4">Ключевые показатели</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">{t.founded}</div>
                      <div className="font-medium text-gray-800">{university.founded}</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">{t.students}</div>
                      <div className="font-medium text-gray-800">{university.students.toLocaleString()}</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">{t.ranking}</div>
                      <div className="font-medium text-gray-800">#{university.ranking}</div>
                    </div>
                  </li>
                   <li className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Прием документов до</div>
                      <div className="font-medium text-red-600">{university.admissionDeadlines}</div>
                    </div>
                  </li>
                </ul>

                <hr className="my-6 border-gray-200" />
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Общежитие</span>
                        <span className={`font-medium ${university.dormitory ? 'text-green-600' : 'text-gray-400'}`}>
                            {university.dormitory ? 'Есть' : 'Нет'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Военная кафедра</span>
                        <span className={`font-medium ${university.militaryDept ? 'text-green-600' : 'text-gray-400'}`}>
                            {university.militaryDept ? 'Есть' : 'Нет'}
                        </span>
                    </div>
                </div>

                {/* Contact Info */}
                {university.contacts && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 text-sm">Контакты</h4>
                    <div className="space-y-3 text-sm">
                      {university.contacts.address && (
                         <div className="flex gap-3 items-start">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                            <span className="text-gray-600">{university.contacts.address}</span>
                         </div>
                      )}
                      {university.contacts.phone && (
                         <div className="flex gap-3 items-center">
                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                            <a href={`tel:${university.contacts.phone}`} className="text-brand-600 hover:underline">{university.contacts.phone}</a>
                         </div>
                      )}
                      {university.contacts.email && (
                         <div className="flex gap-3 items-center">
                            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                            <a href={`mailto:${university.contacts.email}`} className="text-brand-600 hover:underline truncate">{university.contacts.email}</a>
                         </div>
                      )}
                       {university.contacts.website && (
                         <div className="flex gap-3 items-center">
                            <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                            <a href={university.contacts.website} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline truncate">
                              {university.contacts.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                         </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  className="w-full mt-6 bg-brand-600 text-white py-3 font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
                  onClick={() => {
                    const website = university.contacts?.website;
                    if (website) {
                      window.open(website, '_blank', 'noopener,noreferrer');
                    } else {
                      alert(
                        lang === 'kz'
                          ? 'Университеттің веб-сайты белгісіз. Байланыс ақпаратын пайдаланыңыз.'
                          : lang === 'en'
                          ? 'University website is not available. Please use the contact information.'
                          : 'Сайт университета не указан. Воспользуйтесь контактными данными.'
                      );
                    }
                  }}
                >
                  {lang === 'kz' ? 'Өтінім беру' : lang === 'en' ? 'Apply Now' : 'Подать заявку'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* TAB: REVIEWS */}
        {activeTab === 'reviews' && (
           <ReviewsSection university={university} lang={lang} />
        )}

        {/* TAB: MEDIA/GALLERY */}
        {activeTab === 'media' && (
          <div className="p-6 md:p-8 h-full flex flex-col min-h-[600px] animate-fade-in space-y-8">
            
            {/* 3D Tour Section */}
            {university.tourUrl && (
               <div className="w-full">
                   <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Box className="w-5 h-5 text-brand-600" /> {t.tour_tab}
                   </h3>
                   <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
                     <iframe 
                       src={university.tourUrl} 
                       className="absolute inset-0 w-full h-full border-0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                       loading="lazy"
                       title={`3D Tour of ${university.name}`}
                     />
                     <div className="absolute top-2 right-2 z-10">
                        <a 
                          href={university.tourUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/80 backdrop-blur hover:bg-white text-gray-700 p-2 rounded-lg shadow-sm flex items-center gap-2 text-xs font-medium transition-all"
                          title="Открыть в новой вкладке"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden sm:inline">На весь экран</span>
                        </a>
                     </div>
                   </div>
               </div>
            )}

            {/* Gallery Grid */}
            <div className="flex flex-col h-full">
                <div className="mb-6">
                   <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-brand-600" /> {t.gallery_tab}
                   </h3>
                   <p className="text-gray-500">Фотографии кампуса и студенческой жизни.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[200px]">
                    {/* Main Image */}
                    <div className="sm:col-span-2 row-span-2 rounded-xl overflow-hidden relative group cursor-pointer">
                        <img src={university.image} alt="Main Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <span className="text-white font-medium">Главный корпус</span>
                        </div>
                    </div>
                    {/* Fallback Grid */}
                    {GALLERY_IMAGES.map((img, idx) => (
                       <div key={idx} className="rounded-xl overflow-hidden relative group cursor-pointer">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                       </div>
                    ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
