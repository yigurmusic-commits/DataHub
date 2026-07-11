
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { UNIVERSITIES as STATIC_UNIVERSITIES, PROFESSIONS, LOGO_URL } from './constants';
import { supabase } from './services/supabaseClient';
import { TRANSLATIONS } from './translations';
import { University, Profession, ViewState, Language, UserProfile, StudentProfile as IStudentProfile } from './types';
import { UniversityDetail } from './components/UniversityDetail';
import { ProfessionDetail } from './components/ProfessionDetail';
import { ComparisonView } from './components/ComparisonView';
import { GuidanceView } from './components/GuidanceView';
import { StudentProfile } from './components/StudentProfile';
import { AIChat, AIChatRef } from './components/AIChat';
import { QuizModal } from './components/QuizModal';
import { LandingPage } from './components/LandingPage';
import { Search, GraduationCap, ArrowRight, LayoutGrid, PlusCircle, CheckCircle, MapPin, ChevronLeft, ChevronRight, X, Sparkles, LogOut, User, Megaphone, Briefcase, Wallet, Heart, ArrowUp, Sun, Moon, Award, Compass } from 'lucide-react';

import { ErrorBoundary } from './components/ErrorBoundary';
import { BottomNav } from './components/BottomNav';
import { useDebounce } from './hooks/useDebounce';
import { ScholarshipHub } from './components/ScholarshipHub';
import { useAuth } from './services/useAuth';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const { user, loading: authLoading, signOut, syncUserData, fetchUserData } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = !!user || isGuest;

  const [view, setView] = useState<ViewState>('home');
  const [lang, setLang] = useState<Language>('ru');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('datahub_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('datahub_theme', theme);
  }, [theme]);

  // --- SUPABASE DATA STATE ---
  const [universities, setUniversities] = useState<University[]>(STATIC_UNIVERSITIES);
  const [_isLoadingDb, setIsLoadingUniversities] = useState(true);

  const fetchUniversities = useCallback(async () => {
    try {
      setIsLoadingUniversities(true);
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          programs (*)
        `)
        .order('ranking', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map snake_case DB fields to camelCase University interface
        const mapped: University[] = data.map((u: any) => ({
          id: u.id,
          name: u.name,
          shortName: u.short_name,
          location: u.location,
          description: u.description,
          founded: u.founded,
          ranking: u.ranking,
          students: u.students,
          tuitionAvg: u.tuition_avg,
          image: u.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
          logo: u.logo || u.short_name,
          mission: u.mission,
          partners: u.partners || [],
          admissionDeadlines: u.admission_deadlines,
          category: u.category,
          tourUrl: u.tour_url,
          achievements: u.achievements || [],
          admissionRequirements: u.admission_requirements || [],
          admissionProcedure: u.admission_procedure || [],
          scholarships: u.scholarships || [],
          dormitory: u.dormitory,
          militaryDept: u.military_dept,
          contacts: u.contacts || {},
          doubleDegree: u.double_degree || [],
          programs: (u.programs || []).map((p: any) => ({
            name: p.name,
            degree: p.degree,
            duration: p.duration,
            language: p.language,
            description: p.description,
            tuition: p.tuition,
          })),
          reviews: [],
        }));
        setUniversities(mapped);
      } else {
        // Fallback to static data if DB is empty
        setUniversities(STATIC_UNIVERSITIES);
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using static data:', err);
      setUniversities(STATIC_UNIVERSITIES);
    } finally {
      setIsLoadingUniversities(false);
    }
  }, []);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);
  
  // Selection States
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  
  // --- PERSISTENT STATE INITIALIZATION ---
  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('datahub_compare');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [savedList, setSavedList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('datahub_saved');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  
  const [studentProfileData, setStudentProfileData] = useState<Partial<IStudentProfile>>(() => {
    try {
      const saved = localStorage.getItem('datahub_profile');
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });

  // --- MERGE CLOUD DATA ON LOGIN ---
  useEffect(() => {
    if (user) {
      fetchUserData().then(data => {
        if (data) {
          // Merge arrays (unique) or just overwrite
          if (data.saved_list) setSavedList(Array.from(new Set([...savedList, ...data.saved_list])));
          if (data.comparison_list) setComparisonList(Array.from(new Set([...comparisonList, ...data.comparison_list])));
          if (data.profile_data) setStudentProfileData(prev => ({ ...prev, ...data.profile_data }));
        }
      });
    }
  }, [user]);

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('datahub_compare', JSON.stringify(comparisonList));
    if (user) syncUserData(savedList, comparisonList, studentProfileData);
  }, [comparisonList]);

  useEffect(() => {
    localStorage.setItem('datahub_saved', JSON.stringify(savedList));
    if (user) syncUserData(savedList, comparisonList, studentProfileData);
  }, [savedList]);

  useEffect(() => {
    localStorage.setItem('datahub_profile', JSON.stringify(studentProfileData));
    if (user) syncUserData(savedList, comparisonList, studentProfileData);
  }, [studentProfileData]);

  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [previousView, setPreviousView] = useState<ViewState>('home');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ref for AI Chat
  const aiChatRef = useRef<AIChatRef>(null);
  
  // Filters state
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLangFilter, setSelectedLangFilter] = useState('All');
  const [selectedProfCategory, setSelectedProfCategory] = useState('All'); // For professions
  const [uniScope, setUniScope] = useState<'domestic' | 'international'>('domestic');

  const [applicantMode, setApplicantMode] = useState<'school' | 'college'>(() => {
    try {
      const saved = localStorage.getItem('datahub_applicant_mode');
      return saved === 'college' ? 'college' : 'school';
    } catch { return 'school'; }
  });

  useEffect(() => {
    localStorage.setItem('datahub_applicant_mode', applicantMode);
  }, [applicantMode]);
  
  // View mode for Saved items (internal switch)
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const itemsPerPage = 7;
  const t = TRANSLATIONS[lang];

  // Helper mapping for Russian data in constants.ts to translation keys
  const cityMapping: Record<string, string> = {
    'Астана': 'Astana',
    'Алматы': 'Almaty',
    'Шымкент': 'Shymkent',
    'Караганда': 'Karaganda',
    'Актау': 'Aktau',
    'Атырау': 'Atyrau',
    'Каскелен': 'Kaskelen'
  };

  const getCityDisplayName = (city: string) => {
    const key = cityMapping[city];
    if (key && t[`city_${key}` as keyof typeof t]) {
      return t[`city_${key}` as keyof typeof t];
    }
    return city;
  };

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  // Handle scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handler
  const handleLogin = (method: 'google' | 'guest' | 'email', data?: { name: string; email: string }) => {
    if (method === 'guest') {
      setIsGuest(true);
      window.scrollTo(0, 0);
    } else if (method === 'email') {
      setIsAuthModalOpen(true);
    } else if (method === 'google') {
      // Инициируем вход через Google средствами Supabase
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      }).catch(err => {
        console.error("Google Auth error:", err);
        alert("Ошибка входа через Google. Убедитесь, что провайдер настроен в Supabase.");
      });
    }
  };

  const handleLogout = async () => {
    if (user) {
      await signOut();
    }
    setIsGuest(false);
    setView('home');
    setUserProfile(null);
  };

  // --- Filtering Logic ---
  const cities = useMemo(() => ['All', ...Array.from(new Set(universities.map(u => u.location))).sort()], [universities]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(universities.map(u => u.category || 'State'))).sort()], [universities]);
  const profCategories = useMemo(() => ['All', ...Array.from(new Set(PROFESSIONS.map(p => p.category))).sort()], []);
  const suggestions = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) return [];
    const term = debouncedSearchTerm.toLowerCase();
    
    // Universities & Programs
    const uniMatches = universities
      .filter(u => u.name.toLowerCase().includes(term) || u.shortName.toLowerCase().includes(term))
      .map(u => ({ type: 'university', text: u.name, subtext: u.location }));
    
    const progMatches = new Set<string>();
    universities.forEach(u => {
      u.programs.forEach(p => {
        if (p.name.toLowerCase().includes(term)) progMatches.add(p.name);
      });
    });
    
    // Professions
    const profMatches = PROFESSIONS
      .filter(p => p.title.toLowerCase().includes(term))
      .map(p => ({ type: 'profession', text: p.title, subtext: t.nav_professions }));

    const progMatchesArray = Array.from(progMatches).map(p => ({ 
      type: 'program', text: p, subtext: t.nav_programs
    }));
    
    return [...uniMatches, ...profMatches, ...progMatchesArray].slice(0, 6);
  }, [debouncedSearchTerm, t, universities]);

  // Filtered Lists
  const filteredUniversities = useMemo(() => {
     return universities.filter(u => {
        // If showing saved only
        if (showSavedOnly && !savedList.includes(u.id)) return false;

        // Scope filter: domestic vs international
        const isInternational = u.category === 'International';
        if (uniScope === 'domestic' && isInternational) return false;
        if (uniScope === 'international' && !isInternational) return false;

        const term = debouncedSearchTerm.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(term) || u.shortName.toLowerCase().includes(term);
        const matchesProgram = u.programs.some(p => p.name.toLowerCase().includes(term));
        const isSearchMatch = term === '' || matchesName || matchesProgram;
        const matchesCity = selectedCity === 'All' || u.location === selectedCity;
        const matchesCategory = selectedCategory === 'All' || u.category === selectedCategory;
        const matchesLangFilter = selectedLangFilter === 'All' || u.programs.some(p => {
           const l = p.language.toLowerCase();
           if (selectedLangFilter === 'en') return l.includes('english') || l.includes('en');
           if (selectedLangFilter === 'ru') return l.includes('ru') || l.includes('рус');
           if (selectedLangFilter === 'kz') return l.includes('kz') || l.includes('каз');
           return false;
        });
        return isSearchMatch && matchesCity && matchesCategory && matchesLangFilter;
     });
  }, [debouncedSearchTerm, selectedCity, selectedCategory, selectedLangFilter, showSavedOnly, savedList, universities, uniScope]);

  const filteredProfessions = useMemo(() => {
      return PROFESSIONS.filter(p => {
          const term = debouncedSearchTerm.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(term);
          const matchesCategory = selectedProfCategory === 'All' || p.category === selectedProfCategory;
          return (term === '' || matchesTitle) && matchesCategory;
      });
  }, [debouncedSearchTerm, selectedProfCategory]);

  // Pagination Logic depends on view
  const activeList = view === 'professions' ? filteredProfessions : filteredUniversities;
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  
  // Slicing
  const currentItems = activeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const comparisonUniversities = universities.filter(u => comparisonList.includes(u.id));

  // Handlers
  const handleUniversityClick = (uni: University) => { 
    setPreviousView(view);
    setSelectedUni(uni); 
    setView('details'); 
  };
  const handleProfessionClick = (prof: Profession) => { 
    setSelectedProfession(prof); 
    setView('profession-details'); 
  };
  
  const toggleComparison = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setComparisonList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert('Можно сравнить не более 4 университетов одновременно');
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleSaved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedList(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleBack = () => { 
      if (view === 'profession-details') setView('professions');
      else if (view === 'details') setView(previousView);
      else {
        setView('home'); 
        setShowSavedOnly(false);
      }
      setSelectedUni(null);
      setSelectedProfession(null); 
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value); setCurrentPage(1); setShowSuggestions(true); };
  
  const handleSuggestionClick = (text: string, type: string) => { 
      setSearchTerm(text); 
      setShowSuggestions(false); 
      setCurrentPage(1); 
      if (type === 'profession') setView('professions');
      else setView('home');
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) catalogElement.scrollIntoView({ behavior: 'smooth' });
  };
  const handleQuizSubmit = (profile: UserProfile) => { 
      setUserProfile(profile); 
      // Save quiz results to the persistent student profile
      setStudentProfileData(prev => ({
          ...prev,
          score: profile.score,
          subjectPair: profile.subjectPair,
          interests: profile.interests,
          city: profile.city
      }));
      setView('guidance'); 
  };

  const formatMoney = (amount: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT', maximumSignificantDigits: 3 }).format(amount);

  // Fallback image URL
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800";

  // --- RENDER ---

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onLogin={handleLogin} />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} lang={lang} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-24 sm:pb-20 font-sans animate-fade-in relative transition-colors duration-200">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} lang={lang} />
      {/* Navbar - Full Width */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
        <div className="w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); setShowSavedOnly(false); }}>
            <img 
               src={LOGO_URL} 
               alt="Logo" 
               className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hidden sm:inline">
              DataHub <span className="text-brand-600 dark:text-brand-400 font-normal">{t.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Theme Toggle */}
              <button 
                 onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                 className="p-2 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                 title={t.dark_mode}
              >
                 {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400 animate-pulse" />}
              </button>

              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 text-xs font-medium">
                {(['ru', 'kz', 'en'] as Language[]).map(l => (
                   <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-md transition-all ${lang === l ? 'bg-white dark:bg-gray-600 shadow text-brand-700 dark:text-brand-350' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                   >
                     {l.toUpperCase()}
                   </button>
                ))}
              </div>

             {/* Saved Toggle Button */}
             <button 
                onClick={() => {
                   if (showSavedOnly) {
                      setShowSavedOnly(false);
                      setView('home');
                   } else {
                      setShowSavedOnly(true);
                      setView('home');
                   }
                }}
                className={`text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium flex items-center gap-1.5 sm:gap-2 transition-colors ${
                  showSavedOnly 
                    ? 'bg-red-50 text-red-600 border border-red-100' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Избранное"
             >
                <Heart className={`w-4 h-4 ${showSavedOnly || savedList.length > 0 ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{t.favorites}</span>
                {savedList.length > 0 && (
                   <span className="bg-white/50 px-1.5 rounded-full text-xs ml-0.5">{savedList.length}</span>
                )}
             </button>

             {comparisonList.length > 0 && (
               <button 
                onClick={() => setView('compare')}
                className="text-sm bg-brand-50 text-brand-700 px-3 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-brand-100 transition-colors"
               >
                 <PlusCircle className="w-4 h-4" />
                 <span className="hidden sm:inline">{t.compare_btn}</span>
                 <span className="bg-brand-200 px-1.5 rounded-full text-xs">{comparisonList.length}</span>
               </button>
             )}

             <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>
             
             {/* User Profile / Logout */}
             <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden md:flex flex-col items-end cursor-pointer" onClick={() => setView('profile')}>
                    <span className="text-sm font-bold text-gray-800 leading-none">
                        {user ? (user.user_metadata?.full_name || studentProfileData.name || user.email) : (studentProfileData.name || 'Гость')}
                    </span>
                    <span className="text-xs text-brand-600 hover:underline">
                        Профиль
                    </span>
                </div>
                {!user && (
                   <button 
                     onClick={() => setIsAuthModalOpen(true)}
                     className="text-sm font-bold text-white bg-brand-600 px-4 py-2 rounded-full hover:bg-brand-700 transition-colors shadow-sm"
                   >
                     {t.loginBtn || 'Войти'}
                   </button>
                )}
                {user && (
                  <button 
                      onClick={() => setView('profile')}
                      className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors"
                  >
                      <User className="w-5 h-5" />
                  </button>
                )}
                <button 
                    onClick={handleLogout}
                    className="hidden sm:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Выйти"
                >
                    <LogOut className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </nav>

      {/* Main Container - Full Width Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR (ADVERTISEMENT) - Fixed Width */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-fit space-y-6">
             {/* Tab Navigation (Sidebar for Desktop) */}
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 shadow-sm space-y-1">
                 <button 
                   onClick={() => { 
                     setView('home'); 
                     setShowSavedOnly(false); 
                     setCurrentPage(1); 
                     setSearchTerm('');
                     setSelectedCity('All');
                     setSelectedCategory('All');
                     setSelectedLangFilter('All');
                   }}
                   className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors ${!showSavedOnly && (view === 'home' || view === 'details') ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                 >
                    <GraduationCap className="w-5 h-5" />
                    {t.nav_unis}
                 </button>
                 <button 
                   onClick={() => { 
                     setView('professions'); 
                     setShowSavedOnly(false); 
                     setCurrentPage(1); 
                     setSearchTerm('');
                     setSelectedProfCategory('All');
                   }}
                   className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors ${view === 'professions' || view === 'profession-details' ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                 >
                    <Briefcase className="w-5 h-5" />
                    {t.nav_professions}
                 </button>
                 <button 
                   onClick={() => { 
                     setView('scholarships'); 
                     setShowSavedOnly(false); 
                     setCurrentPage(1); 
                     setSearchTerm('');
                   }}
                   className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors ${view === 'scholarships' ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                 >
                    <Award className="w-5 h-5" />
                    {t.nav_scholarships}
                 </button>
                 <button 
                   onClick={() => { setView('profile'); }}
                   className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors ${view === 'profile' ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                 >
                    <User className="w-5 h-5" />
                    {t.nav_profile}
                 </button>
             </div>

             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-1.5 rounded bg-white">
                    {t.ad_title}
                </div>
                <div className="bg-white p-4 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform text-brand-600">
                    <Megaphone className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{t.ad_placeholder}</h4>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">{t.ad_desc}</p>
                <button className="text-sm font-medium bg-white text-brand-600 border border-brand-200 px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors shadow-sm">
                    {t.ad_btn}
                </button>
             </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0 max-w-[1600px]">
            {(view === 'home' || view === 'professions') && (
              <>
                {/* Hero & Search Section */}
                <div className="text-center mb-6 sm:mb-10 animate-fade-in-down">
                  {showSavedOnly ? (
                      <>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                           <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-current" /> {t.favorites_title}
                        </h1>
                        <p className="text-gray-500 mb-6 max-w-2xl mx-auto">{t.favorites_desc}</p>
                      </>
                  ) : (
                      <>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            {t.hero_title}
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
                            {t.hero_desc}
                        </p>
                         {/* Quiz Button */}
                        <div className="mb-5 sm:mb-8">
                            <button 
                                onClick={() => setIsQuizOpen(true)}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-green-500/30 hover:-translate-y-0.5 hover:shadow-green-500/40 transition-all text-sm sm:text-base"
                            >
                                <Sparkles className="w-5 h-5 text-yellow-200" />
                                {t.btn_quiz_take}
                            </button>
                        </div>
                      </>
                  )}


                  {/* --- APPLICANT MODE SWITCHER (School / College) --- */}
                  {!showSavedOnly && (
                    <div className="flex flex-col items-center gap-4 mb-6">
                      {/* Mode Toggle */}
                      <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 sm:p-1.5 gap-0.5 sm:gap-1 shadow-inner">
                        <button
                          onClick={() => setApplicantMode('school')}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            applicantMode === 'school'
                              ? 'bg-white dark:bg-gray-700 text-brand-700 dark:text-brand-400 shadow-md'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                          }`}
                        >
                          🎓 {lang === 'kz' ? 'Мектептен кейін' : lang === 'en' ? 'After School' : 'После школы'}
                        </button>
                        <button
                          onClick={() => setApplicantMode('college')}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            applicantMode === 'college'
                              ? 'bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-400 shadow-md'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                          }`}
                        >
                          🏫 {lang === 'kz' ? 'Колледждан кейін' : lang === 'en' ? 'After College' : 'После колледжа'}
                        </button>
                      </div>

                      {/* Info Banner */}
                      {applicantMode === 'school' ? (
                        <div className="w-full max-w-3xl bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-950/30 dark:to-blue-950/30 border border-brand-100 dark:border-brand-800 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start text-left animate-fade-in">
                          <div className="text-3xl shrink-0">🎓</div>
                          <div>
                            <p className="font-bold text-brand-800 dark:text-brand-300 mb-1">
                              {lang === 'kz' ? 'Мектеп бітірушілер үшін' : lang === 'en' ? 'For School Graduates' : 'Для выпускников школы'}
                            </p>
                            <p className="text-sm text-brand-700 dark:text-brand-400 leading-relaxed">
                              {lang === 'kz'
                                ? 'ЕҰТ нәтижелері бойынша бакалавриатқа түсесіз. Мемлекеттік грант үшін минималды балл: 50–70 (мамандыққа байланысты). Оқу мерзімі: 4 жыл.'
                                : lang === 'en'
                                ? 'You apply to Bachelor programs based on UNT scores. Minimum grant score: 50–70 (depends on specialty). Duration: 4 years.'
                                : 'Поступаете в бакалавриат по результатам ЕНТ. Минимальный балл для гранта: 50–70 (зависит от специальности). Срок обучения: 4 года.'}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-xs bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-2.5 py-1 rounded-full font-medium">📋 ЕНТ</span>
                              <span className="text-xs bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-2.5 py-1 rounded-full font-medium">🎯 {lang === 'kz' ? 'Грант конкурсы' : lang === 'en' ? 'Grant competition' : 'Конкурс грантов'}</span>
                              <span className="text-xs bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 px-2.5 py-1 rounded-full font-medium">📅 4 {lang === 'kz' ? 'жыл' : lang === 'en' ? 'years' : 'года'}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full max-w-3xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start text-left animate-fade-in">
                          <div className="text-3xl shrink-0">🏫</div>
                          <div>
                            <p className="font-bold text-purple-800 dark:text-purple-300 mb-1">
                              {lang === 'kz' ? 'Колледж бітірушілер үшін' : lang === 'en' ? 'For College Graduates' : 'Для выпускников колледжа'}
                            </p>
                            <p className="text-sm text-purple-700 dark:text-purple-400 leading-relaxed">
                              {lang === 'kz'
                                ? 'Колледж дипломымен 2–3 курсқа ауыса аласыз немесе күндізгі/сырттай бөлімде оқи аласыз. ЕҰТ тапсырмауыңыз мүмкін — жеке вуздармен тексеріңіз.'
                                : lang === 'en'
                                ? 'With a college diploma you can transfer to year 2–3 or study full/part-time. UNT may not be required — verify with each university.'
                                : 'С дипломом колледжа можно перевестись на 2–3 курс или учиться на очном/заочном. ЕНТ может не требоваться — уточняйте в вузе.'}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full font-medium">📄 {lang === 'kz' ? 'Колледж дипломы' : lang === 'en' ? 'College Diploma' : 'Диплом колледжа'}</span>
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full font-medium">⚡ {lang === 'kz' ? 'Қысқартылған оқу' : lang === 'en' ? 'Shortened Program' : 'Сокращённая программа'}</span>
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full font-medium">📅 2–3 {lang === 'kz' ? 'жыл' : lang === 'en' ? 'years' : 'года'}</span>
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full font-medium">🌙 {lang === 'kz' ? 'Сырттай / кешкі' : lang === 'en' ? 'Part-time / Evening' : 'Заочно / вечернее'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- SCOPE SWITCHER (КЗ / Зарубежные) --- */}
                  {view === 'home' && !showSavedOnly && (
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-0.5 sm:gap-1 shadow-inner">
                        <button
                          onClick={() => { setUniScope('domestic'); setSelectedCity('All'); setSelectedCategory('All'); setCurrentPage(1); }}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${uniScope === 'domestic' ? 'bg-white dark:bg-gray-700 text-brand-700 dark:text-brand-400 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                        >
                          🇰🇿 {lang === 'kz' ? 'Қазақстан вузлары' : lang === 'en' ? 'Kazakhstan unis' : 'Казахстанские вузы'}
                        </button>
                        <button
                          onClick={() => { setUniScope('international'); setSelectedCity('All'); setSelectedCategory('All'); setCurrentPage(1); }}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${uniScope === 'international' ? 'bg-white dark:bg-gray-700 text-brand-700 dark:text-brand-400 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                        >
                          🌍 {lang === 'kz' ? 'Шетелдік вузлар' : lang === 'en' ? 'International unis' : 'Зарубежные вузы'}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-2 sm:gap-4 relative z-20">
                    {/* Search */}
                    <div className="flex-grow-[2] relative">
                        <input 
                        type="text" 
                        placeholder={t.search_placeholder} 
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-base"
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        
                        {searchTerm && (
                            <button 
                                onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left animate-fade-in z-50">
                            {suggestions.map((s, idx) => (
                            <div 
                                key={idx}
                                onClick={() => handleSuggestionClick(s.text, s.type)}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                            >
                                <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                                {s.type === 'university' ? <LayoutGrid className="w-4 h-4" /> : 
                                 s.type === 'profession' ? <Briefcase className="w-4 h-4" /> : 
                                 <GraduationCap className="w-4 h-4" />}
                                </div>
                                <div>
                                <div className="text-gray-900 font-medium text-sm">{s.text}</div>
                                <div className="text-xs text-gray-500">{s.subtext}</div>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>

                    {/* Filters: DYNAMIC based on view */}
                    {view === 'home' && !showSavedOnly ? (
                      <div className="flex flex-col sm:flex-row gap-2 flex-grow-[1]">
                          {/* City filter — only relevant for domestic */}
                          {uniScope === 'domestic' && (
                            <select 
                                value={selectedCity}
                                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer text-base w-full"
                            >
                                <option value="All">{t.filter_all_cities}</option>
                                {cities.filter(c => c !== 'All' && !c.includes(',') && !c.includes('США') && !c.includes('Велик') && !c.includes('Россия') && !c.includes('Корея') && !c.includes('Швейц') && !c.includes('Синга')).map(c => (
                                    <option key={c} value={c}>{getCityDisplayName(c)}</option>
                                ))}
                            </select>
                          )}
                          
                          {/* Category filter — only relevant for domestic */}
                          {uniScope === 'domestic' && (
                            <select 
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer text-base w-full"
                            >
                                <option value="All">{t.filter_all_categories}</option>
                                {categories.filter(c => c !== 'All' && c !== 'International').map(c => (
                                    <option key={c} value={c}>{t[`cat_${c}` as keyof typeof t] || c}</option>
                                ))}
                            </select>
                          )}

                          {/* Language filter — always visible */}
                          <select 
                              value={selectedLangFilter}
                              onChange={(e) => { setSelectedLangFilter(e.target.value); setCurrentPage(1); }}
                              className="px-3 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer text-base w-full"
                          >
                              <option value="All">{t.filter_all_languages}</option>
                              <option value="kz">{t.filter_lang_kz}</option>
                              <option value="ru">{t.filter_lang_ru}</option>
                              <option value="en">{t.filter_lang_en}</option>
                          </select>
                      </div>
                    ) : (view === 'professions' ? (
                      /* Professions Filters */
                       <div className="flex flex-col sm:flex-row gap-2 flex-grow-[0.5]">
                          <select 
                              value={selectedProfCategory}
                              onChange={(e) => { setSelectedProfCategory(e.target.value); setCurrentPage(1); }}
                              className="px-3 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer text-base w-full"
                          >
                              <option value="All">{t.filter_all_categories}</option>
                              {profCategories.filter(c => c !== 'All').map(c => (
                                  <option key={c} value={c}>{c}</option>
                              ))}
                          </select>
                       </div>
                    ) : null)}
                  </div>
                </div>

                {/* --- CATALOG LIST --- */}
                <div id="catalog" className="mb-8">
                  {activeList.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                      <div className="text-gray-400 mb-2">
                        {showSavedOnly ? <Heart className="w-12 h-12 mx-auto opacity-20" /> : <Search className="w-12 h-12 mx-auto opacity-20" />}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{showSavedOnly ? t.favorites_empty : t.not_found}</h3>
                      {showSavedOnly && (
                         <button onClick={() => setShowSavedOnly(false)} className="mt-4 text-brand-600 font-medium hover:underline">
                            {t.back_to_list}
                         </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {/* UNIVERSITIES LIST */}
                      {view === 'home' && currentItems.map(item => {
                        const uni = item as University;
                        const isSaved = savedList.includes(uni.id);
                        
                        return (
                          <div 
                            key={uni.id} 
                            onClick={() => handleUniversityClick(uni)}
                            className="bg-white p-3 sm:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group flex flex-col md:flex-row gap-3 sm:gap-6 relative"
                          >
                            {/* Favorite Button (Absolute) */}
                            <button 
                                onClick={(e) => toggleSaved(e, uni.id)}
                                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-400'} shadow-sm`}
                            >
                                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>

                            {/* University Image */}
                            <div className="w-full md:w-48 h-36 sm:h-48 md:h-auto shrink-0 relative rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                              <img 
                                src={uni.image} 
                                alt={uni.name}
                                onError={(e) => {
                                  e.currentTarget.src = FALLBACK_IMAGE;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex-1 py-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2 pr-10">
                                <h3 className="font-bold text-base sm:text-xl text-gray-900 group-hover:text-brand-600 transition-colors">{uni.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">{t.ranking}: #{uni.ranking}</span>
                                  {uni.category && (
                                      <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                          {t[`cat_${uni.category}` as keyof typeof t] || uni.category}
                                      </span>
                                  )}
                                  {/* College mode badge: highlight shortened programs */}
                                  {applicantMode === 'college' && uni.programs.some(p => {
                                    const dur = p.duration?.toLowerCase() || '';
                                    return dur.includes('2') || dur.includes('3 год') || dur.includes('3 жыл') || dur.includes('3 year') || dur.includes('1.5') || dur.includes('2.5');
                                  }) && (
                                    <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                                      ⚡ {lang === 'kz' ? 'Қысқартылған' : lang === 'en' ? 'Shortened' : 'Сокращённая'}
                                    </span>
                                  )}
                                  {applicantMode === 'college' && uni.admissionProcedure?.some(p => p.toLowerCase().includes('колледж') || p.toLowerCase().includes('перевод') || p.toLowerCase().includes('diploma')) && (
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                                      ✓ {lang === 'kz' ? 'Ауысу мүмкін' : lang === 'en' ? 'Transfer OK' : 'Перевод OK'}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{uni.description}</p>

                              {/* College mode: show relevant programs with shortened duration */}
                              {applicantMode === 'college' && (() => {
                                const shortProgs = uni.programs.filter(p => {
                                  const dur = p.duration?.toLowerCase() || '';
                                  return dur.includes('2') || dur.includes('3 год') || dur.includes('3 жыл') || dur.includes('3 year') || dur.includes('1.5') || dur.includes('2.5');
                                });
                                if (shortProgs.length === 0) return null;
                                return (
                                  <div className="mb-3 flex flex-wrap gap-1.5">
                                    <span className="text-xs text-purple-600 font-semibold">{lang === 'kz' ? 'Қысқа бағдарламалар:' : lang === 'en' ? 'Short programs:' : 'Короткие программы:'}</span>
                                    {shortProgs.slice(0, 3).map((p, i) => (
                                      <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
                                        {p.name} ({p.duration})
                                      </span>
                                    ))}
                                  </div>
                                );
                              })()}
                              
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-gray-400" /> {uni.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <GraduationCap className="w-4 h-4 text-gray-400" /> {uni.programs.length} {t.programs_count}
                                </span>
                                <span className="text-green-600 font-medium">
                                  {uni.tuitionAvg}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l md:border-gray-100">
                              <button 
                                  onClick={(e) => toggleComparison(e, uni.id)}
                                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm w-full md:w-32 transition-all border ${
                                      comparisonList.includes(uni.id) 
                                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-medium' 
                                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                                  }`}
                                >
                                  {comparisonList.includes(uni.id) ? (
                                      <>
                                          <CheckCircle className="w-4 h-4" /> 
                                          <span>{t.add_to_compare}</span>
                                      </>
                                  ) : (
                                      <>
                                          <PlusCircle className="w-4 h-4" />
                                          <span>{t.compare_btn}</span>
                                      </>
                                  )}
                              </button>
                              
                              <button className="flex items-center justify-center gap-1 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 w-full md:w-32 py-2.5 sm:py-2 rounded-lg transition-colors">
                                  {t.details} <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* PROFESSIONS LIST */}
                      {view === 'professions' && currentItems.map(item => {
                         const prof = item as Profession;
                         return (
                            <div 
                              key={prof.id} 
                              onClick={() => handleProfessionClick(prof)}
                              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-start"
                            >
                               <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                     <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-600 transition-colors">{prof.title}</h3>
                                     <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                        {prof.category}
                                     </span>
                                  </div>
                                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{prof.description}</p>
                                  
                                  <div className="flex flex-wrap items-center gap-6 text-sm">
                                      <div className="flex items-center gap-2 text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-lg">
                                         <Wallet className="w-4 h-4" /> {formatMoney(prof.salary.avg)}
                                      </div>
                                      <div className="flex items-center gap-2 text-gray-500">
                                         <Briefcase className="w-4 h-4" /> {t.prof_demand}: {t[`prof_${prof.demand.toLowerCase()}` as keyof typeof t]}
                                      </div>
                                  </div>
                               </div>

                               <div className="flex md:flex-col items-center justify-center w-full md:w-auto mt-auto md:mt-0">
                                   <button className="flex items-center justify-center gap-1 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 w-full md:w-32 py-2.5 rounded-lg transition-colors">
                                      {t.details} <ChevronRight className="w-4 h-4" />
                                   </button>
                               </div>
                            </div>
                         );
                      })}

                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-600"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-lg border font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                              : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-600"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* DETAILS VIEWS */}
            {view === 'details' && selectedUni && (
              <ErrorBoundary onReset={handleBack}>
                <UniversityDetail 
                  university={selectedUni} 
                  onBack={handleBack} 
                  isSaved={savedList.includes(selectedUni.id)}
                  onToggleSave={() => {
                     const id = selectedUni.id;
                     setSavedList(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
                  }}
                  lang={lang}
                  onAskAI={(text) => aiChatRef.current?.sendMessage(text)}
                />
              </ErrorBoundary>
            )}
            
            {view === 'profession-details' && selectedProfession && (
              <ErrorBoundary onReset={handleBack}>
                <ProfessionDetail 
                  profession={selectedProfession} 
                  onBack={handleBack} 
                  onUniClick={handleUniversityClick}
                  lang={lang}
                />
              </ErrorBoundary>
            )}

            {view === 'compare' && (
              <ErrorBoundary onReset={() => setView('home')}>
                <ComparisonView universities={comparisonUniversities} onBack={() => setView('home')} lang={lang} />
              </ErrorBoundary>
            )}

            {view === 'guidance' && userProfile && (
              <ErrorBoundary onReset={() => setView('home')}>
                <GuidanceView 
                  profile={userProfile} 
                  onBack={() => setView('home')} 
                  onUniClick={handleUniversityClick}
                  lang={lang}
                />
              </ErrorBoundary>
            )}

            {/* NEW: Student Profile View */}
            {view === 'profile' && (
              <ErrorBoundary onReset={handleBack}>
                <StudentProfile
                   initialProfile={studentProfileData}
                   onBack={handleBack}
                   lang={lang}
                />
              </ErrorBoundary>
            )}

            {/* NEW: Scholarships View */}
            {view === 'scholarships' && (
              <ErrorBoundary onReset={handleBack}>
                <ScholarshipHub
                  universities={universities}
                  lang={lang}
                  onUniClick={handleUniversityClick}
                  savedList={savedList}
                  onToggleSave={toggleSaved}
                />
              </ErrorBoundary>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            
          {/* Support Buttons */}
          <div className="mb-8 text-center">
             <h3 className="text-gray-900 font-bold mb-4">{t.contact_support}</h3>
             <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/77771234567" // Placeholder
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                   {/* WhatsApp Icon SVG */}
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                   {t.write_whatsapp}
                </a>

                <a 
                  href="https://t.me/datahub_support" // Placeholder
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0088cc] text-white px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                   {/* Telegram Icon SVG */}
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                   {t.write_telegram}
                </a>
             </div>
          </div>
          
          <p className="text-gray-500 text-sm">© 2025 DataHub {t.title}.</p>
        </div>
      </footer>

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onSubmit={handleQuizSubmit} 
        lang={lang}
        applicantMode={applicantMode}
      />

      {/* AI Assistant - Only show on home, details, compare */}
      {view !== 'guidance' && view !== 'profile' && <AIChat ref={aiChatRef} />}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-40 p-2.5 sm:p-3 bg-white text-gray-600 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:text-brand-600 transition-all animate-fade-in"
          title="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Navigation — только mobile */}
      <BottomNav
        view={view}
        showSavedOnly={showSavedOnly}
        savedCount={savedList.length}
        comparisonCount={comparisonList.length}
        lang={lang}
        onNavigate={(targetView) => {
          if (targetView === 'home') {
            setView('home');
            setShowSavedOnly(false);
            setCurrentPage(1);
            setSearchTerm('');
            setSelectedCity('All');
            setSelectedCategory('All');
            setSelectedLangFilter('All');
          } else if (targetView === 'professions') {
            setView('professions');
            setShowSavedOnly(false);
            setCurrentPage(1);
            setSearchTerm('');
            setSelectedProfCategory('All');
          } else if (targetView === 'scholarships') {
            setView('scholarships');
            setShowSavedOnly(false);
            setCurrentPage(1);
            setSearchTerm('');
          } else {
            setView(targetView);
          }
        }}
        onToggleSaved={() => {
          setShowSavedOnly(prev => !prev);
          setView('home');
        }}
        onCompare={() => setView('compare')}
      />
    </div>
  );
}
