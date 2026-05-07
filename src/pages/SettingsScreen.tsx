import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { LANGUAGES } from '../i18n/languages';

export const SettingsScreen = () => {
  const navigate  = useNavigate();
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showLangSelector, setShowLangSelector] = useState(false);

  const currentLangLabel =
    LANGUAGES.find(l => l.code === i18n.language.split('-')[0])?.label ?? 'English';

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppLayout title="Settings">
      <div className="settings-container">

        <p className="settings-subtitle">{t('settings.subtitle')}</p>

        <SectionCard title={t('settings.preferences')}>
          <div className="settings-item">
            <span>{t('settings.notifications')}</span>
            <span>🔒</span>
          </div>
          <div
            className="settings-item"
            onClick={() => setShowLangSelector(true)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setShowLangSelector(true)}
            style={{ cursor: 'pointer' }}
          >
            <span>{t('settings.language')}</span>
            <span className="settings-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {currentLangLabel}
              <span style={{ fontSize: '11px', opacity: 0.5 }}>›</span>
            </span>
          </div>
          <div className="settings-item" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <span>{t('settings.darkMode')}</span>
            <button
              className={`theme-toggle${isDark ? ' active' : ''}`}
              onClick={e => { e.stopPropagation(); toggleTheme(); }}
              aria-label={t('settings.darkMode')}
              aria-pressed={isDark}
            >
              <span className="theme-toggle-thumb" />
            </button>
          </div>
        </SectionCard>

        <SectionCard title={t('settings.account')}>
          {user && (
            <div className="settings-item">
              <span>{t('settings.loggedInAs')}</span>
              <span className="settings-value" style={{ fontSize: '12px' }}>{user.name}</span>
            </div>
          )}
          <div className="settings-item">
            <span>{t('settings.privacy')}</span>
            <span className="settings-arrow">➡️</span>
          </div>
          <div className="settings-item">
            <span>{t('settings.help')}</span>
            <span className="settings-arrow">➡️</span>
          </div>
        </SectionCard>

        <SectionCard title={t('settings.about')}>
          <div className="settings-item">
            <span>{t('settings.version')}</span>
            <span className="settings-value">1.0.0</span>
          </div>
          <div className="settings-item">
            <span>{t('settings.terms')}</span>
            <span className="settings-arrow">➡️</span>
          </div>
        </SectionCard>

        <button className="signout-btn" onClick={handleSignOut}>
          {t('settings.signOut')}
        </button>

      </div>

      {showLangSelector && (
        <LanguageSelector onClose={() => setShowLangSelector(false)} />
      )}
    </AppLayout>
  );
};
