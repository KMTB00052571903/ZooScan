import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';

interface AuthUser {
  name: string;
  role: 'staff';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const resolveStaffUser = async (userId: string): Promise<AuthUser | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', userId)
    .maybeSingle();

  if (error || !data || data.role !== 'staff') return null;
  return { name: data.name, role: 'staff' };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
            const resolved = await resolveStaffUser(userId);
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
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const resolved = await resolveStaffUser(data.user.id);
    if (!resolved) {
      await supabase.auth.signOut();
      throw new Error('Acceso denegado. Solo el personal autorizado puede ingresar.');
    }

    setUser(resolved);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
