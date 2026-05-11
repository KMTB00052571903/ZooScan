import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCodeIcon } from '../components/ui/icons/QrCodeIcon';
import { SettingsIcon } from '../components/ui/icons/SettingsIcon';
import { ProfileIcon } from '../components/ui/icons/ProfileIcon';
import { CollectionIcon } from '../components/ui/icons/CollectionIcon';
import { MapIcon } from '../components/ui/icons/MapIcon';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const navigate = useNavigate();

  const renderHeaderContent = () => {
    if (title === 'Home') {
      return (
        <>
          <button className="icon-btn" onClick={() => navigate('/settings')} style={{ background: 'transparent', border: 'none' }}>
            <SettingsIcon size={20} />
          </button>
          <button className="icon-btn" onClick={() => navigate('/collection')} style={{ background: 'transparent', border: 'none', marginLeft: '10px' }}>
            <CollectionIcon size={20} />
          </button>
          <button className="icon-btn" onClick={() => navigate('/map')} style={{ background: 'transparent', border: 'none', marginLeft: '10px' }}>
            <MapIcon size={20} />
          </button>
          <div style={{ flex: 1 }}></div>
          <button className="icon-btn" onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none' }}>
            <ProfileIcon size={20} />
          </button>
        </>
      );
    }

    if (title === 'Profile') {
      return (
        <>
          <button className="icon-btn" onClick={() => navigate('/home')}>←</button>
          <h1 className="header-title">{title}</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="icon-btn" onClick={() => navigate('/qr')}>
              <QrCodeIcon size={20} />
            </button>
            <button className="icon-btn" onClick={() => navigate('/settings')}>
              <SettingsIcon size={20} />
            </button>
          </div>
        </>
      );
    }

    // Default for all other screens (Settings, Map, Animal Detail, Zone Details, etc.)
    return (
      <>
        <button 
          className="icon-btn" 
          onClick={() => title === 'Zoo Map' ? navigate('/home') : navigate(-1)}
        >
          ←
        </button>
        <h1 className="header-title">{title}</h1>
        <div style={{ width: '40px' }}></div>
      </>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {renderHeaderContent()}
      </header>
      <main className="app-main">
        {children}
      </main>
    </div>
  );
};
