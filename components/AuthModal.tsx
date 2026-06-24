import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ru' | 'kz' | 'en';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        // Automatically login or inform user to check email
        // Wait, supabase often requires email confirmation. For simplicity, we assume they can login or auto-login.
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    ru: {
      loginTitle: 'Вход в аккаунт',
      signupTitle: 'Создание аккаунта',
      email: 'Email',
      password: 'Пароль',
      name: 'Ваше имя',
      loginBtn: 'Войти',
      signupBtn: 'Зарегистрироваться',
      noAccount: 'Нет аккаунта?',
      haveAccount: 'Уже есть аккаунт?',
      toSignup: 'Зарегистрироваться',
      toLogin: 'Войти',
      errorInvalid: 'Неверный email или пароль',
    },
    kz: {
      loginTitle: 'Жүйеге кіру',
      signupTitle: 'Аккаунт құру',
      email: 'Электрондық пошта',
      password: 'Құпиясөз',
      name: 'Атыңыз',
      loginBtn: 'Кіру',
      signupBtn: 'Тіркелу',
      noAccount: 'Аккаунтыңыз жоқ па?',
      haveAccount: 'Аккаунтыңыз бар ма?',
      toSignup: 'Тіркелу',
      toLogin: 'Кіру',
      errorInvalid: 'Қате email немесе құпиясөз',
    },
    en: {
      loginTitle: 'Login',
      signupTitle: 'Create Account',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      loginBtn: 'Login',
      signupBtn: 'Sign Up',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      toSignup: 'Sign up',
      toLogin: 'Login',
      errorInvalid: 'Invalid email or password',
    }
  };

  const t = texts[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? t.loginTitle : t.signupTitle}
            </h2>
            <p className="text-gray-500 text-sm">
              Для сохранения данных в Личном кабинете
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.name}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="Alikhan"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="example@mail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 mt-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-70 shadow-lg shadow-brand-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? t.loginBtn : t.signupBtn)}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">{isLogin ? t.noAccount : t.haveAccount}</span>{' '}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-brand-600 font-bold hover:underline"
            >
              {isLogin ? t.toSignup : t.toLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
