import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './i18n';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { FavoritesProvider } from './context/FavoritesProvider.tsx';
import { SpeciesProvider } from './context/SpeciesContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './styles/styles.css';
import './styles/gamification.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <UserProvider>
              <SpeciesProvider>
                <App />
                <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
              </SpeciesProvider>
            </UserProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
