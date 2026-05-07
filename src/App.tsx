import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/edit-profile" element={<EditProfileScreen />} />
      <Route path="/qr" element={<QRScreen />} />
      <Route path="/animal" element={<AnimalDetailScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
      <Route path="/collection" element={<CollectionScreen />} />
    </Routes>
  );
}

export default App;
