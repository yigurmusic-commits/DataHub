import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../translations';
import { Calculator, Wallet, DollarSign, BookOpen, Clock, AlertCircle, RefreshCw } from 'lucide-react';

interface RoiCalculatorProps {
  lang: 'ru' | 'kz' | 'en';
  defaultTuition?: number; // Optional initial tuition in KZT
  defaultSalary?: number; // Optional initial expected salary in KZT
  programName?: string;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  lang,
  defaultTuition = 1000000,
  defaultSalary = 350000,
  programName,
}) => {
  const t = TRANSLATIONS[lang];

  // States
  const [tuitionPerYear, setTuitionPerYear] = useState(defaultTuition);
  const [isOnGrant, setIsOnGrant] = useState(false);
  const [livingExpenses, setLivingExpenses] = useState(120000); // Monthly living expenses (KZT)
  const [expectedSalary, setExpectedSalary] = useState(defaultSalary);
  const [durationYears, setDurationYears] = useState(4);
  const [monthlyStipend, setMonthlyStipend] = useState(41838); // Standard Kazakh student grant stipend

  // Sync defaults if they change
  useEffect(() => {
    setTuitionPerYear(defaultTuition);
  }, [defaultTuition]);

  useEffect(() => {
    setExpectedSalary(defaultSalary);
  }, [defaultSalary]);

  // Calculations
  const calculations = React.useMemo(() => {
    const annualTuitionCost = isOnGrant ? 0 : tuitionPerYear;
    const totalTuition = annualTuitionCost * durationYears;
    const totalLiving = livingExpenses * 12 * durationYears;
    const totalStipendReceived = isOnGrant ? (monthlyStipend * 12 * durationYears) : 0;
    
    // Total investment during study
    const totalCostOfEducation = totalTuition + totalLiving - totalStipendReceived;

    // Return calculations
    // Net profit after graduation = expected starting salary - living expenses
    const netMonthlyBenefit = expectedSalary - livingExpenses;
    
    let paybackMonths = 0;
    let isInstant = false;
    let neverPaysBack = false;

    if (totalCostOfEducation <= 0) {
      isInstant = true;
    } else if (netMonthlyBenefit <= 0) {
      neverPaysBack = true;
    } else {
      paybackMonths = Math.ceil(totalCostOfEducation / netMonthlyBenefit);
    }

    return {
      totalCostOfEducation,
      netMonthlyBenefit,
      paybackMonths,
      isInstant,
      neverPaysBack,
      totalTuition,
      totalLiving,
      totalStipendReceived
    };
  }, [tuitionPerYear, isOnGrant, livingExpenses, expectedSalary, durationYears, monthlyStipend]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT', maximumFractionDigits: 0 }).format(amount);
  };

  const formatPeriod = (months: number) => {
    if (months <= 0) return '';
    const yrs = Math.floor(months / 12);
    const mths = months % 12;

    const yrsLabel = lang === 'ru' ? 'лет' : lang === 'kz' ? 'жыл' : 'years';
    const yrLabel = lang === 'ru' ? 'год' : lang === 'kz' ? 'жыл' : 'year';
    const mthsLabel = lang === 'ru' ? 'мес.' : lang === 'kz' ? 'ай' : 'mos';

    if (yrs === 0) return `${mths} ${mthsLabel}`;
    if (mths === 0) return `${yrs} ${yrs > 1 && yrs < 5 ? (lang === 'ru' ? 'года' : yrsLabel) : yrs === 1 ? yrLabel : yrsLabel}`;
    return `${yrs} ${yrs === 1 ? yrLabel : yrs > 1 && yrs < 5 ? (lang === 'ru' ? 'года' : yrsLabel) : yrsLabel} и ${mths} ${mthsLabel}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-600 to-indigo-700 text-white p-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-200" />
          {t.roi_calculator}
        </h3>
        {programName && (
          <p className="text-brand-100 text-xs font-semibold uppercase tracking-wider mt-1">
            {lang === 'ru' ? 'Для специальности:' : lang === 'kz' ? 'Мамандық үшін:' : 'For specialty:'} {programName}
          </p>
        )}
        <p className="text-brand-100 text-sm mt-2 leading-relaxed">
          {t.roi_desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Sliders Input Panel */}
        <div className="space-y-6">
          {/* Grant checkbox */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-700">
            <input
              type="checkbox"
              id="grant-checkbox"
              checked={isOnGrant}
              onChange={(e) => setIsOnGrant(e.target.checked)}
              className="w-5 h-5 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 focus:ring-2 cursor-pointer"
            />
            <label htmlFor="grant-checkbox" className="text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">
              {t.roi_grant}
            </label>
          </div>

          {/* Annual Tuition Slider (Disabled if on grant) */}
          {!isOnGrant && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span>{t.roi_tuition}</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">{formatMoney(tuitionPerYear)}/год</span>
              </div>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="50000"
                value={tuitionPerYear}
                onChange={(e) => setTuitionPerYear(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>300к ₸</span>
                <span>2.5м ₸</span>
                <span>5м ₸</span>
              </div>
            </div>
          )}

          {/* Duration in years */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span>{lang === 'ru' ? 'Срок обучения' : lang === 'kz' ? 'Оқу мерзімі' : 'Study Duration'}</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">{durationYears} {lang === 'ru' ? 'года' : lang === 'kz' ? 'жыл' : 'years'}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((y) => (
                <button
                  key={y}
                  onClick={() => setDurationYears(y)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                    durationYears === y
                      ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Living Expenses Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span>{t.roi_living}</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">{formatMoney(livingExpenses)}/мес</span>
            </div>
            <input
              type="range"
              min="30000"
              max="500000"
              step="10000"
              value={livingExpenses}
              onChange={(e) => setLivingExpenses(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>30к ₸</span>
              <span>250к ₸</span>
              <span>500к ₸</span>
            </div>
          </div>

          {/* Monthly Expected Salary Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span>{t.roi_salary}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatMoney(expectedSalary)}/мес</span>
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="20000"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>100к ₸</span>
              <span>1м ₸</span>
              <span>2м ₸</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {t.roi_result}
            </div>

            {calculations.isInstant ? (
              <div className="py-6 px-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="text-3xl font-extrabold tracking-tight">
                  {lang === 'ru' ? 'Мгновенно!' : lang === 'kz' ? 'Дереу!' : 'Instantly!'}
                </div>
                <p className="text-sm mt-2 font-medium">
                  {lang === 'ru' 
                    ? 'Ваше обучение окупается за счет стипендии/гранта.' 
                    : lang === 'kz' 
                    ? 'Шәкіртақы/грант есебінен оқуыңыз бірден өтеледі.' 
                    : 'Your studies pay back instantly due to the scholarship/grant stipend.'}
                </p>
              </div>
            ) : calculations.neverPaysBack ? (
              <div className="py-6 px-4 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 rounded-2xl border border-red-100 dark:border-red-900/50">
                <div className="text-3xl font-extrabold tracking-tight">
                  {lang === 'ru' ? 'Никогда' : lang === 'kz' ? 'Өтелмейді' : 'Never'}
                </div>
                <p className="text-sm mt-2 font-medium">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  {lang === 'ru' 
                    ? 'Ваш будущий доход ниже расходов на проживание.' 
                    : lang === 'kz' 
                    ? 'Болашақ табысыңыз тұру шығынынан аз.' 
                    : 'Your future income is less than monthly living expenses.'}
                </p>
              </div>
            ) : (
              <div className="py-4">
                <div className="text-4xl md:text-5xl font-black text-brand-600 dark:text-brand-400 tracking-tight">
                  {formatPeriod(calculations.paybackMonths)}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {lang === 'ru' 
                    ? 'Время, необходимое для покрытия общих инвестиций в образование.' 
                    : lang === 'kz' 
                    ? 'Білімге салынған жалпы инвестицияны өтеуге қажетті уақыт.' 
                    : 'Time needed to cover the total investment in education.'}
                </p>
              </div>
            )}
          </div>

          {/* Detailed Calculations List */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
              <span className="text-gray-500 dark:text-gray-400">{lang === 'ru' ? 'Всего вложено в учебу:' : lang === 'kz' ? 'Оқуға салынған инвестиция:' : 'Total invested in study:'}</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {calculations.totalCostOfEducation <= 0 ? '0 ₸' : formatMoney(calculations.totalCostOfEducation)}
              </span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>— {lang === 'ru' ? 'Стоимость обучения:' : lang === 'kz' ? 'Оқу ақысы:' : 'Tuition:'}</span>
              <span>{formatMoney(calculations.totalTuition)}</span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>— {lang === 'ru' ? 'Расходы на жизнь:' : lang === 'kz' ? 'Тұру шығындары:' : 'Living cost:'}</span>
              <span>{formatMoney(calculations.totalLiving)}</span>
            </div>

            {isOnGrant && (
              <div className="flex justify-between text-xs text-emerald-500 font-medium">
                <span>+ {lang === 'ru' ? 'Стипендии получено:' : lang === 'kz' ? 'Алынған шәкіртақы:' : 'Total stipend:'}</span>
                <span>{formatMoney(calculations.totalStipendReceived)}</span>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200/50 dark:border-gray-700/50 pt-2 font-semibold">
              <span className="text-gray-500 dark:text-gray-400">{lang === 'ru' ? 'Чистый доход в месяц:' : lang === 'kz' ? 'Айлық таза табыс:' : 'Net monthly income:'}</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {calculations.netMonthlyBenefit <= 0 ? '0 ₸' : formatMoney(calculations.netMonthlyBenefit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
