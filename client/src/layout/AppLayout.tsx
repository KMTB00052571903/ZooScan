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
    switch (title) {
      case 'Home':
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
      case 'Profile':
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
      case 'StaffProfile':
        return (
          <>
            <button className="icon-btn" onClick={() => navigate('/dashboard')}>←</button>
            <h1 className="header-title">{title}</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="icon-btn" onClick={() => navigate('/dashboard/settings')}>
                <SettingsIcon size={20} />
              </button>
            </div>
          </>
        );        
      case 'Settings':
      case 'QR scanning':
      case 'Animal Detail':
      case 'Edit Profile':
      case 'My Collection':
      case 'Zoo Map':
        return (
          <>
            <button className="icon-btn" onClick={() => navigate(-1)}>←</button>
            <h1 className="header-title">{title}</h1>
            <div style={{ width: '40px' }}></div>
          </>
        );
      default:
        return <h1 className="header-title">{title}</h1>;
    }
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
