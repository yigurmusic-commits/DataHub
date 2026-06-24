// c:\Users\user\Desktop\raimgaz-main\components\SkeletonCard.tsx
import React from 'react';

interface SkeletonCardProps {
  lines?: number;
  showImage?: boolean;
  className?: string;
}

const pulse = 'animate-pulse bg-gray-200 rounded';

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  showImage = false,
  className = '',
}) => {
  return (
    <div className={`bg-white p-5 rounded-xl border border-gray-200 ${className}`}>
      <div className="flex gap-4">
        {showImage && (
          <div className={`w-20 h-20 shrink-0 rounded-xl ${pulse}`} />
        )}
        <div className="flex-1 space-y-3">
          <div className={`h-5 w-3/4 ${pulse}`} />
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`h-3 ${pulse}`}
              style={{ width: `${85 - i * 15}%` }}
            />
          ))}
          <div className="flex gap-2 pt-1">
            <div className={`h-6 w-20 rounded-full ${pulse}`} />
            <div className={`h-6 w-24 rounded-full ${pulse}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Специальный скелетон для University Card в каталоге
export const UniversitySkeletonCard: React.FC = () => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-6">
    <div className={`w-full md:w-48 h-48 shrink-0 rounded-xl ${pulse}`} />
    <div className="flex-1 space-y-3">
      <div className={`h-6 w-2/3 ${pulse}`} />
      <div className={`h-3 w-full ${pulse}`} />
      <div className={`h-3 w-4/5 ${pulse}`} />
      <div className="flex gap-3 pt-2">
        <div className={`h-4 w-24 rounded-full ${pulse}`} />
        <div className={`h-4 w-20 rounded-full ${pulse}`} />
        <div className={`h-4 w-28 rounded-full ${pulse}`} />
      </div>
    </div>
    <div className="flex gap-2 md:flex-col justify-center w-full md:w-32">
      <div className={`h-9 rounded-lg ${pulse} w-full`} />
      <div className={`h-9 rounded-lg ${pulse} w-full`} />
    </div>
  </div>
);
