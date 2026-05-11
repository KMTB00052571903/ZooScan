import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute as P } from './components/ui/ProtectedRoute';
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
import { CollectionScreen } from './pages/CollectionScreen';
import { AnimalsPage } from './pages/AnimalsPage';
import { MapScreen } from './pages/MapScreen';
import { ZoneDetailScreen } from './pages/ZoneDetailScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/home"         element={<P><HomeScreen /></P>} />
      <Route path="/profile"      element={<P><ProfileScreen /></P>} />
      <Route path="/edit-profile" element={<P><EditProfileScreen /></P>} />
      <Route path="/qr"           element={<P><QRScreen /></P>} />
      <Route path="/animal"       element={<P><AnimalDetailScreen /></P>} />
      <Route path="/settings"     element={<P><SettingsScreen /></P>} />
      <Route path="/scan"         element={<P><ScanScreen /></P>} />
      <Route path="/collection"   element={<P><CollectionScreen /></P>} />
      <Route path="/animals"      element={<P><AnimalsPage /></P>} />
      <Route path="/map"          element={<P><MapScreen /></P>} />
      <Route path="/zone/:zoneId" element={<P><ZoneDetailScreen /></P>} />
    </Routes>
  );
}

export default App;
