import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './useAuth';
import type { AuthUser } from './useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('zooscan_token')
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('zooscan_user');
    return saved ? JSON.parse(saved) as AuthUser : null;
  });

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
