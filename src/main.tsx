import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider }  from './context/ThemeContext.tsx';
import { AuthProvider }   from './context/AuthContext.tsx';
import { SpeciesProvider } from './context/SpeciesContext.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* ThemeProvider al exterior para que afecte toda la app */}
      <ThemeProvider>
        <AuthProvider>
          <SpeciesProvider>
            <App />
          </SpeciesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
