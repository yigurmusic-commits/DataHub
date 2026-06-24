
import React, { useState } from 'react';
import { LayoutGrid, ArrowRight, CheckCircle, Sparkles, GraduationCap, Globe, Users, Mail, ChevronLeft } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface LandingPageProps {
  onLogin: (method: 'google' | 'guest' | 'email', data?: { name: string; email: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulation of API delay
    setTimeout(() => {
      onLogin('google');
    }, 1500);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onLogin('email', formData);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* Left Side - Content & Login */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 animate-fade-in relative z-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <img 
               src={LOGO_URL} 
               alt="DataHub Logo" 
               className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            DataHub <span className="text-brand-600 font-normal">ВУЗ-ов РК</span>
          </span>
        </div>

        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Твой путеводитель в мир <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
            высшего образования
          </span>
        </h1>
        
        <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
          Единая платформа для абитуриентов Казахстана. Сравнивай университеты, оценивай шансы на грант с AI и поступай правильно.
        </p>

        {/* Login Area */}
        <div className="max-w-md w-full transition-all duration-300">
          
          {showEmailForm ? (
            /* EMAIL FORM */
            <form onSubmit={handleEmailLogin} className="space-y-4 animate-fade-in">
              <button 
                type="button" 
                onClick={() => setShowEmailForm(false)}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2"
              >
                <ChevronLeft className="w-4 h-4" /> Назад к выбору
              </button>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Как вас зовут?</label>
                <input 
                  type="text" 
                  required
                  placeholder="Введите ваше имя"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-base"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (необязательно)</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-base"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading || !formData.name}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Войти'}
              </button>
            </form>
          ) : (
            /* BUTTONS LIST */
            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-brand-600 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Продолжить с Google</span>
                  </>
                )}
              </button>

              <button 
                onClick={() => setShowEmailForm(true)}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
              >
                <Mail className="w-5 h-5 text-gray-600" />
                <span>Войти через Email</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">или</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button 
                onClick={() => onLogin('guest')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                Войти как Гость <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Features List (Mobile/Small screens only) */}
        <div className="mt-12 lg:hidden space-y-3">
           <FeatureItem text="Умный подбор вузов по ЕНТ" />
           <FeatureItem text="3D туры по кампусам" />
           <FeatureItem text="Сравнение образовательных программ" />
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-12 text-gray-400 text-sm">
          © 2025 DataHub Education. Все права защищены.
        </div>
      </div>

      {/* Right Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center">
        {/* Abstract Shapes/Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 w-full max-w-lg space-y-6 p-8">
           {/* Decorative Cards */}
           <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">AI Ассистент</h3>
                    <p className="text-gray-500 text-sm">Анализ шансов на грант</p>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="h-2 bg-gray-100 rounded-full w-full"></div>
                 <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform -rotate-2 translate-x-8 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <GraduationCap className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">40+ ВУЗов</h3>
                    <p className="text-gray-500 text-sm">Единый реестр университетов</p>
                 </div>
              </div>
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                 ))}
                 <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">+1k</div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <Globe className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900">3D Туры</h3>
                    <p className="text-gray-500 text-sm">Посещай кампусы онлайн</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
    <span className="font-medium">{text}</span>
  </div>
);
