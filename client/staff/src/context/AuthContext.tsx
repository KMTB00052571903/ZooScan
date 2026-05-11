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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted || !session) { setLoading(false); return; }
      const { data: profile } = await supabase
        .from('profiles').select('name, role').eq('id', session.user.id).single();
      if (!mounted) return;
      if (profile?.role === 'staff') setUser({ name: profile.name, role: 'staff' });
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        if (!session) { setUser(null); return; }
        const { data: profile } = await supabase
          .from('profiles').select('name, role').eq('id', session.user.id).single();
        if (!mounted) return;
        if (profile?.role === 'staff') {
          setUser({ name: profile.name, role: 'staff' });
        } else {
          setUser(null);
          supabase.auth.signOut();
        }
      }
    );

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // onAuthStateChange verifica el rol y setea user (o hace signOut si no es staff)
  };

  const logout = () => { supabase.auth.signOut(); };

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
