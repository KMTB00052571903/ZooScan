import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Lee el tema guardado; si no hay nada usa 'light' (la paleta actual de la app)
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('zooscan_theme') as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  // Aplica el atributo data-theme al <html> y persiste en localStorage cada vez que cambia
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('zooscan_theme', theme);
    } catch { /* entorno sin localStorage (privado) */ }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
};
