import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { AuthContext } from './useAuth';
import type { AuthUser } from './useAuth';

const resolveUser = async (userId: string): Promise<AuthUser | null> => {
  const { data } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', userId)
    .single();
  if (!data) return null;
  return { name: data.name, role: data.role as 'visitor' | 'staff' };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session) {
        const resolved = await resolveUser(session.user.id);
        if (mounted) setUser(resolved);
      }
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        if (!session) { setUser(null); return; }
        const resolved = await resolveUser(session.user.id);
        if (mounted) setUser(resolved);
      }
    );

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const logout = () => { supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
