import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущую сессию при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Слушаем изменения состояния авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Метод для сохранения данных (Избранное, Сравнения, Профиль)
  const syncUserData = async (savedList: string[], comparisonList: string[], profileData: any) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          saved_list: savedList, 
          comparison_list: comparisonList, 
          profile_data: profileData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) throw error;
    } catch (err) {
      console.error('Ошибка синхронизации данных пользователя:', err);
    }
  };

  // Метод для загрузки данных при входе
  const fetchUserData = async () => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('saved_list, comparison_list, profile_data')
        .eq('id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // PGRST116: No rows found
      return data;
    } catch (err) {
      console.error('Ошибка загрузки данных пользователя:', err);
      return null;
    }
  };

  return { user, session, loading, signOut, syncUserData, fetchUserData };
}
