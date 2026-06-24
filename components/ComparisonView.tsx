import React, { useState, useEffect, useCallback } from 'react';
import { University } from '../types';
import { Sparkles, Loader2, Trophy, AlertCircle } from 'lucide-react';
import { compareUniversitiesWithAI } from '../services/geminiService';
import { TRANSLATIONS } from '../translations';

interface ComparisonViewProps {
  universities: University[];
  onBack: () => void;
  lang?: 'ru' | 'kz' | 'en';
}

interface AIComparisonData {
  summary: string;
  verdict: string;
  table: {
    criteria: string;
    values: Record<string, string>;
  }[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ universities, onBack, lang = 'ru' }) => {
  const [aiData, setAiData] = useState<AIComparisonData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      const resultJsonString = await compareUniversitiesWithAI(universities, lang);
      if (!resultJsonString || resultJsonString.trim().length === 0) {
        throw new Error('Empty AI response');
      }
      const cleaned = resultJsonString.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      const parsedData = JSON.parse(cleaned) as AIComparisonData;
      setAiData(parsedData);
    } catch (e) {
      console.error("Failed to parse AI response", e);
    } finally {
      setIsAnalyzing(false);
    }
  }, [universities, lang]);

  // Auto-analyze when component mounts
  useEffect(() => {
    if (universities.length >= 2 && !aiData) {
      handleAnalyze();
    }
  }, [universities.length, aiData, handleAnalyze]);

  return (
    <div className="animate-fade-in pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t.compare_btn}</h2>
        <button onClick={onBack} className="text-brand-600 hover:underline">← {t.back_to_list}</button>
      </div>

      {universities.length < 2 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">{t.compare_min}</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">
            {t.nav_unis}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* AI Qualitative Comparison (The "Smart Table") */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden relative">
             <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-4 sm:p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Sparkles className="w-6 h-6 text-yellow-300" />
                   <div>
                     <h3 className="text-lg font-bold">{t.ai_compare_title}</h3>
                     <p className="text-brand-100 text-xs sm:text-sm opacity-90">Анализ преимуществ и недостатков на основе данных</p>
                   </div>
                </div>
                {isAnalyzing && (
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.ai_analyzing}
                  </div>
                )}
             </div>

             <div className="p-0">
               {aiData ? (
                 <>
                   {/* AI Summary */}
                   <div className="p-6 bg-brand-50 border-b border-brand-100 text-gray-700 italic">
                      "{aiData.summary}"
                   </div>

                   {/* Comparison Table */}
                   <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                       <thead>
                         <tr>
                           <th className="p-4 bg-gray-50 border-b border-gray-200 w-1/4 min-w-[150px] text-gray-500 font-medium text-sm uppercase tracking-wider sticky left-0 z-10">
                             Критерий
                           </th>
                           {universities.map(uni => (
                             <th key={uni.id} className="p-4 border-b border-gray-200 min-w-[200px] bg-white">
                               <div className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                 {uni.shortName}
                               </div>
                             </th>
                           ))}
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                         {aiData.table.map((row, idx) => (
                           <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                             <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0 group-hover:bg-gray-100/80 transition-colors border-r border-gray-100">
                               {row.criteria}
                             </td>
                             {universities.map(uni => (
                               <td key={uni.id} className="p-4 text-gray-600 leading-snug">
                                 {row.values[uni.id] || "—"}
                               </td>
                             ))}
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>

                   {/* AI Verdict */}
                   <div className="p-6 bg-green-50 border-t border-green-100">
                      <div className="flex items-start gap-3">
                        <Trophy className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                        <div>
                          <h4 className="font-bold text-green-800 mb-1">Вердикт AI</h4>
                          <p className="text-green-700 text-sm leading-relaxed">{aiData.verdict}</p>
                        </div>
                      </div>
                   </div>
                 </>
               ) : (
                 <div className="p-12 text-center text-gray-400">
                    {!isAnalyzing && (
                       <button onClick={handleAnalyze} className="text-brand-600 hover:underline">
                         Попробовать снова
                       </button>
                    )}
                 </div>
               )}
             </div>
          </div>

          {/* Hard Facts Table (Quantitative) */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Технические характеристики</h3>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 font-medium text-gray-500 bg-gray-50 w-1/4">{t.location}</td>
                    {universities.map(uni => <td key={uni.id} className="p-4 font-medium">{uni.location}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-500 bg-gray-50">{t.ranking}</td>
                    {universities.map(uni => <td key={uni.id} className="p-4">#{uni.ranking}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-500 bg-gray-50">Стоимость</td>
                    {universities.map(uni => <td key={uni.id} className="p-4 font-medium text-green-600">{uni.tuitionAvg}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-500 bg-gray-50">{t.students}</td>
                    {universities.map(uni => <td key={uni.id} className="p-4">{uni.students.toLocaleString()}</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-500 bg-gray-50">Основан</td>
                    {universities.map(uni => <td key={uni.id} className="p-4">{uni.founded}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
