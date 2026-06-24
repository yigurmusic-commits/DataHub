import React from 'react';
import { FEATURES_DATA } from '../constants';
import * as Icons from 'lucide-react';

interface FeaturesGridProps {
  onNavigate: (featureId: number) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {FEATURES_DATA.map((feature, idx) => {
        const IconComponent = (Icons as any)[feature.icon] || Icons.HelpCircle;
        
        return (
          <div 
            key={feature.id}
            onClick={() => onNavigate(feature.id)}
            className={`
              relative overflow-hidden group cursor-pointer
              bg-gradient-to-br from-brand-500 to-brand-700 
              text-white p-6 rounded-2xl shadow-lg 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1
              ${idx >= 3 ? 'from-brand-600 to-brand-800' : ''} 
            `}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <IconComponent className="w-32 h-32 transform translate-x-8 -translate-y-8" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-4xl font-bold opacity-30 mb-2 block">{feature.id}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-brand-100 text-sm leading-relaxed">{feature.desc}</p>
              </div>
              
              <div className="mt-6 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Перейти <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};