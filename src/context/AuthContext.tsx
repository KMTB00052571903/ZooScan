import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthUser {
  name: string;
  role: 'visitor' | 'staff';
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, role: 'visitor' | 'staff', name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Al iniciar, leer el token guardado del localStorage
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('zooscan_token')
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('zooscan_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Sincronizar con localStorage cuando cambia el token
  useEffect(() => {
    if (token) {
      localStorage.setItem('zooscan_token', token);
    } else {
      localStorage.removeItem('zooscan_token');
      localStorage.removeItem('zooscan_user');
    }
  }, [token]);

  const login = (newToken: string, role: 'visitor' | 'staff', name: string) => {
    const userData: AuthUser = { name, role };
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('zooscan_token', newToken);
    localStorage.setItem('zooscan_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
