import React, { useState, useMemo } from 'react';
import { University } from '../types';
import { TRANSLATIONS } from '../translations';
import { Search, MapPin, Award, BookOpen, GraduationCap, ArrowRight, Heart } from 'lucide-react';

interface ScholarshipHubProps {
  universities: University[];
  lang: 'ru' | 'kz' | 'en';
  onUniClick: (uni: University) => void;
  savedList: string[];
  onToggleSave: (e: React.MouseEvent, id: string) => void;
}

interface ScholarshipItem {
  id: string; // unique ID
  text: string;
  uni: University;
  country: string;
  coverage: 'full' | 'partial' | 'stipend' | 'other';
}

export const ScholarshipHub: React.FC<ScholarshipHubProps> = ({
  universities,
  lang,
  onUniClick,
  savedList,
  onToggleSave,
}) => {
  const t = TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCoverage, setSelectedCoverage] = useState<'All' | 'full' | 'partial' | 'stipend'>('All');

  // Parse scholarships from universities list
  const scholarships = useMemo(() => {
    const list: ScholarshipItem[] = [];
    
    universities.forEach(uni => {
      const isIntl = uni.category === 'International';
      // Determine country
      let country = 'Казахстан';
      if (isIntl) {
        // e.g. "Южная Корея, Дэджон" -> "Южная Корея"
        const parts = uni.location.split(',');
        country = parts[0].trim();
      }

      const rawScholarships = uni.scholarships || [];
      rawScholarships.forEach((text, index) => {
        const lower = text.toLowerCase();
        
        // Determine coverage
        let coverage: 'full' | 'partial' | 'stipend' | 'other' = 'other';
        if (
          lower.includes('100%') || 
          lower.includes('полн') || 
          lower.includes('full') || 
          lower.includes('бесплатн') ||
          lower.includes('квота')
        ) {
          coverage = 'full';
        } else if (
          lower.includes('скидк') || 
          lower.includes('частичн') || 
          lower.includes('partial') ||
          lower.includes('льготн')
        ) {
          coverage = 'partial';
        } else if (
          lower.includes('стипенди') || 
          lower.includes('stipend') || 
          lower.includes('выплат')
        ) {
          coverage = 'stipend';
        }

        list.push({
          id: `${uni.id}-sch-${index}`,
          text,
          uni,
          country,
          coverage,
        });
      });
    });

    return list;
  }, [universities]);

  // Countries list for dropdown filter
  const countries = useMemo(() => {
    const set = new Set<string>();
    scholarships.forEach(s => set.add(s.country));
    return ['All', ...Array.from(set).sort()];
  }, [scholarships]);

  // Filtered scholarships
  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      const matchesSearch = 
        s.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.uni.shortName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = selectedCountry === 'All' || s.country === selectedCountry;
      const matchesCoverage = selectedCoverage === 'All' || s.coverage === selectedCoverage;

      return matchesSearch && matchesCountry && matchesCoverage;
    });
  }, [scholarships, searchTerm, selectedCountry, selectedCoverage]);

  // Translate badge labels
  const getCoverageLabel = (cov: 'full' | 'partial' | 'stipend' | 'other') => {
    switch (cov) {
      case 'full': return t.sch_full;
      case 'partial': return t.sch_partial;
      case 'stipend': return t.sch_stipend;
      default: return lang === 'ru' ? 'Другое' : lang === 'kz' ? 'Басқа' : 'Other';
    }
  };

  const getCoverageBadgeColor = (cov: 'full' | 'partial' | 'stipend' | 'other') => {
    switch (cov) {
      case 'full': 
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'partial': 
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'stipend': 
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-pink-500 animate-pulse" /> {t.nav_scholarships}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
          {lang === 'ru' 
            ? 'Каталог государственных грантов, международных стипендий и внутренних скидок от университетов.' 
            : lang === 'kz' 
            ? 'Мемлекеттік гранттардың, халықаралық шәкіртақылардың және университеттердің ішкі жеңілдіктерінің каталогы.' 
            : 'Directory of government grants, international scholarships, and internal university discounts.'}
        </p>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder={t.sch_search || 'Поиск стипендий...'} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Country filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
            >
              <option value="All">{lang === 'ru' ? 'Все страны' : lang === 'kz' ? 'Барлық елдер' : 'All Countries'}</option>
              {countries.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Coverage filter buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-2">
            {t.sch_coverage}:
          </span>
          {(['All', 'full', 'partial', 'stipend'] as const).map((cov) => (
            <button
              key={cov}
              onClick={() => setSelectedCoverage(cov)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCoverage === cov
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cov === 'All' ? (t.sch_all_coverage || 'Все') : getCoverageLabel(cov)}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarships List */}
      {filteredScholarships.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t.not_found}</h3>
          <p className="text-gray-400 dark:text-gray-500 mt-1">
            {lang === 'ru' ? 'Попробуйте изменить параметры фильтрации' : lang === 'kz' ? 'Сүзгілерді өзгертіп көріңіз' : 'Try changing filtering options'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScholarships.map((s) => {
            const isSaved = savedList.includes(s.uni.id);
            return (
              <div 
                key={s.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md relative"
              >
                {/* Save icon */}
                <button
                  onClick={(e) => onToggleSave(e, s.uni.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                    isSaved 
                      ? 'bg-red-50 text-red-500 dark:bg-red-950/30' 
                      : 'bg-gray-50 text-gray-400 hover:text-red-400 dark:bg-gray-700/50'
                  } shadow-sm z-10`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <div className="space-y-4">
                  {/* Category and location badges */}
                  <div className="flex flex-wrap gap-2 items-center pr-8">
                    <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${getCoverageBadgeColor(s.coverage)}`}>
                      {getCoverageLabel(s.coverage)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                      <MapPin className="w-3 h-3" /> {s.country}
                    </span>
                  </div>

                  {/* Scholarship text */}
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {s.text}
                  </h3>

                  {/* University connection */}
                  <div 
                    onClick={() => onUniClick(s.uni)}
                    className="border-t border-gray-100 dark:border-gray-700 pt-3 flex items-center justify-between cursor-pointer hover:opacity-85"
                  >
                    <div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{lang === 'ru' ? 'Предоставляется в:' : lang === 'kz' ? 'Ұсынушы ЖОО:' : 'Provided by:'}</div>
                      <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:underline">
                        {s.uni.name} ({s.uni.shortName})
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
