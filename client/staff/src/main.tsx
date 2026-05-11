import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { StatsProvider } from './context/StatsProvider.tsx';
import { AnnouncementsProvider } from './context/AnnouncementsProvider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StatsProvider>
          <AnnouncementsProvider>
            <App />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          </AnnouncementsProvider>
        </StatsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
