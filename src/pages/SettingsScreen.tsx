import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { useNavigate } from 'react-router-dom';

export const SettingsScreen = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('Sign out clicked');
    navigate('/login');
  };

  return (
    <AppLayout title="Settings">
      <div className="settings-container">
        
        {/* Subtitle */}
        <p className="settings-subtitle">Configure your app experience</p>

        {/* Preferences Section */}
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

        {/* Account Section */}
        <SectionCard title="Account">
          <div className="settings-item">
            <span>Privacy and security</span>
            <span className="settings-arrow">➡️</span>
          </div>
          <div className="settings-item">
            <span>Help and support</span>
            <span className="settings-arrow">➡️</span>
          </div>
        </SectionCard>

        {/* About Section */}
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

        {/* Sign Out Button */}
        <button className="signout-btn" onClick={handleSignOut}>➡️ Sign out</button>

      </div>
    </AppLayout>
  );
};
