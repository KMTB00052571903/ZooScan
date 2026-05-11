import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { AuthContext } from './useAuth';
import type { AuthUser } from './useAuth';

const resolveUser = async (userId: string): Promise<AuthUser | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', userId)
    .maybeSingle();

  console.log('[resolveUser]', { userId, data, error });

  if (error) return null;
  if (!data) return null;
  return { name: data.name, role: data.role as 'visitor' | 'staff' };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[onAuthStateChange]', event, session?.user?.id ?? 'no session');
        if (!mounted) return;

        if (!session) {
          setUser(null);
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_IN') return;

        const userId = session.user.id;
        setTimeout(async () => {
          if (!mounted) return;
          try {
            const resolved = await resolveUser(userId);
            if (mounted) setUser(resolved);
          } catch {
            if (mounted) setUser(null);
          } finally {
            if (mounted) setLoading(false);
          }
        }, 0);
      }
    );

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('[signIn] START');

    let authResult;
    try {
      authResult = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Supabase timeout after 8s')), 8000)
        )
      ]);
      console.log('[signIn] signInWithPassword done:', authResult.error?.message ?? 'ok');
    } catch (err) {
      console.error('[signIn] signInWithPassword failed:', err);
      throw err;
    }

    if (authResult.error) throw authResult.error;

    let resolved;
    try {
      resolved = await Promise.race([
        resolveUser(authResult.data.user.id),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('resolveUser timeout after 5s')), 5000)
        )
      ]);
      console.log('[signIn] resolveUser done:', resolved);
    } catch (err) {
      console.error('[signIn] resolveUser failed:', err);
      await supabase.auth.signOut();
      throw err;
    }

    if (!resolved) {
      await supabase.auth.signOut();
      throw new Error('No se pudo cargar el perfil');
    }

    setUser(resolved);
    setLoading(false);
    console.log('[signIn] DONE');
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const logout = () => {
    setUser(null);
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
