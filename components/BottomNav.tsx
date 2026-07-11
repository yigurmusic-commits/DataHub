import React from 'react';
import { GraduationCap, Briefcase, User, Heart, BarChart2, Award } from 'lucide-react';
import { ViewState, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface BottomNavProps {
  view: ViewState;
  showSavedOnly: boolean;
  savedCount: number;
  comparisonCount: number;
  onNavigate: (view: ViewState) => void;
  onToggleSaved: () => void;
  onCompare: () => void;
  lang?: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  view,
  showSavedOnly,
  savedCount,
  comparisonCount,
  onNavigate,
  onToggleSaved,
  onCompare,
  lang = 'ru',
}) => {
  const t = TRANSLATIONS[lang];
  const isHome = (view === 'home' || view === 'details') && !showSavedOnly;
  const isProfessions = view === 'professions' || view === 'profession-details';
  const isProfile = view === 'profile';
  const isScholarships = view === 'scholarships';
  const isSaved = showSavedOnly;

  const navItems = [
    {
      id: 'unis',
      label: t.nav_unis,
      icon: GraduationCap,
      active: isHome,
      onClick: () => onNavigate('home'),
    },
    {
      id: 'professions',
      label: t.nav_professions,
      icon: Briefcase,
      active: isProfessions,
      onClick: () => onNavigate('professions'),
    },
    {
      id: 'scholarships',
      label: t.nav_scholarships,
      icon: Award,
      active: isScholarships,
      onClick: () => onNavigate('scholarships'),
    },
    {
      id: 'saved',
      label: t.favorites,
      icon: Heart,
      active: isSaved,
      onClick: onToggleSaved,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    ...(comparisonCount >= 2 ? [{
      id: 'compare',
      label: t.compare_btn,
      icon: BarChart2,
      active: view === 'compare',
      onClick: onCompare,
      badge: comparisonCount,
    }] : []),
    {
      id: 'profile',
      label: t.nav_profile,
      icon: User,
      active: isProfile,
      onClick: () => onNavigate('profile'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-around px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center gap-0.5 min-w-[48px] min-h-[48px] px-2 sm:px-3 py-1 rounded-xl transition-all relative ${
                item.active
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 active:bg-gray-100 dark:active:bg-gray-700'
              }`}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge !== undefined && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-600 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
