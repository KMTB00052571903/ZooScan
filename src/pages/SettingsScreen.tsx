import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const SettingsScreen = () => {
  const navigate  = useNavigate();
  const { logout, user } = useAuth();

  const handleSignOut = () => {
    logout();          // Limpia token del localStorage
    navigate('/login');
  };

  return (
    <AppLayout title="Settings">
      <div className="settings-container">

        <p className="settings-subtitle">Configure your app experience</p>

        <SectionCard title="Preferences">
          <div className="settings-item">
            <span>Notifications</span>
            <span>🔒</span>
          </div>
          <div className="settings-item">
            <span>Language</span>
            <span className="settings-value">English</span>
          </div>
          <div className="settings-item">
            <span>Dark mode</span>
            <span className="settings-value">🟢</span>
          </div>
        </SectionCard>

        <SectionCard title="Account">
          {user && (
            <div className="settings-item">
              <span>Logged in as</span>
              <span className="settings-value" style={{ fontSize: '12px' }}>{user.name}</span>
            </div>
          )}
          <div className="settings-item">
            <span>Privacy and security</span>
            <span className="settings-arrow">➡️</span>
          </div>
          <div className="settings-item">
            <span>Help and support</span>
            <span className="settings-arrow">➡️</span>
          </div>
        </SectionCard>

        <SectionCard title="About">
          <div className="settings-item">
            <span>Version</span>
            <span className="settings-value">1.0.0</span>
          </div>
          <div className="settings-item">
            <span>Terms and conditions</span>
            <span className="settings-arrow">➡️</span>
          </div>
        </SectionCard>

        <button className="signout-btn" onClick={handleSignOut}>
          ➡️ Sign out
        </button>

      </div>
    </AppLayout>
  );
};
