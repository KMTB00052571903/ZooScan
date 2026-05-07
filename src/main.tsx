import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { SpeciesProvider } from './context/SpeciesContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import './styles/styles.css';
import './styles/gamification.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SpeciesProvider>
          <App />
        </SpeciesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
