import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const navigate = useNavigate();

  const renderHeaderContent = () => {
    switch (title) {
      case 'Profile':
        return (
          <>
            <button className="icon-btn" onClick={() => navigate('/qr')}>📷</button>
            <h1 className="header-title">{title}</h1>
            <button className="icon-btn" onClick={() => navigate('/settings')}>⚙️</button>
          </>
        );
      case 'Settings':
      case 'QR scanning':
      case 'Animal Detail':
      case 'Edit Profile':
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
