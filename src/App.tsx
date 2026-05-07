import { Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import './App.css';
import { ProfileScreen } from './pages/ProfileScreen';
import { QRScreen } from './pages/QRScreen';
import { AnimalDetailScreen } from './pages/AnimalDetailScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { ScanScreen } from './screens/ScanScreen';
import { LoginScreen } from './pages/auth/LoginScreen';
import { SignupScreen } from './pages/auth/SignupScreen';
import { EditProfileScreen } from './pages/EditProfileScreen';
import { HomeScreen } from './pages/HomeScreen';
import { AnnouncementToast } from './components/AnnouncementToast';
import { useAuth } from './context/AuthContext';

// Protege rutas privadas: redirige al login si no hay sesión activa
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <>
      {/* Toast global para anuncios en tiempo real del staff */}
      <AnnouncementToast />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login"  element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

        {/* Rutas protegidas — requieren sesión activa */}
        <Route path="/home"         element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/profile"      element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfileScreen /></ProtectedRoute>} />
        <Route path="/qr"           element={<ProtectedRoute><QRScreen /></ProtectedRoute>} />
        <Route path="/animal"       element={<ProtectedRoute><AnimalDetailScreen /></ProtectedRoute>} />
        <Route path="/settings"     element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
        <Route path="/scan"         element={<ProtectedRoute><ScanScreen /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
