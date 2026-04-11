import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ProfileScreen } from './pages/ProfileScreen';
import { QRScreen } from './pages/QRScreen';
import { AnimalDetailScreen } from './pages/AnimalDetailScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { ScanScreen } from './screens/ScanScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/qr" element={<QRScreen />} />
      <Route path="/animal" element={<AnimalDetailScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
    </Routes>
  );
}

export default App;
