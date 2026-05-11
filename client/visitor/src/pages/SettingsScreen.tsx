import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { SectionCard } from '../components/ui/SectionCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LANGUAGES = [
  { code: 'en', label: 'English',   flag: '🇬🇧' },
  { code: 'es', label: 'Español',   flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano',  flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪' },
];

const readSavedLang = (): string => {
  const saved = localStorage.getItem('zooscan_lang');
  if (saved && LANGUAGES.some(l => l.code === saved)) return saved;
  const base = (i18n.language ?? 'en').split('-')[0];
  return LANGUAGES.some(l => l.code === base) ? base : 'en';
};

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDark, toggleDark } = useTheme();
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState<string>(readSavedLang);

  const handleSignOut = () => {
    logout();
    toast.success(t('settings.signOut'));
    navigate('/login');
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('zooscan_lang', code);
    setActiveLang(code);
    toast.success(`Language: ${LANGUAGES.find(l => l.code === code)?.label}`);
  };

  return (
    <AppLayout title={t('settings.title')}>
      <div className="settings-container">
        <p className="settings-subtitle">{t('settings.subtitle')}</p>

        {/* ── Preferences ── */}
        <SectionCard title={t('settings.preferences')}>
          <div className="settings-item">
            <span>{t('settings.notifications')}</span>
            <span>🔒</span>
          </div>

          <div className="settings-item" style={{ cursor: 'pointer' }} onClick={toggleDark}>
            <span>{t('settings.darkMode')}</span>
            <span style={{
              background: isDark ? 'var(--accent-primary)' : '#cbd5e1',
              width: 44, height: 24, borderRadius: 12,
              display: 'flex', alignItems: 'center', padding: 2,
              transition: 'background 0.2s', flexShrink: 0,
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transform: isDark ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 0.2s',
              }} />
            </span>
          </div>
        </SectionCard>

        {/* ── Language selector — lives OUTSIDE SectionCard to avoid CSS conflicts ── */}
        <div style={{
          width: '100%',
          background: 'var(--bg-panel)',
          border: '1px solid var(--glass-border)',
          borderRadius: 16,
          padding: '14px 20px',
          marginBottom: '1.5rem',
        }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600 }}>
            {t('settings.language')}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {LANGUAGES.map(lang => {
              const active = lang.code === activeLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: `2px solid ${active ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    background: active ? 'var(--accent-primary)' : 'transparent',
                    color: active ? '#fff' : 'var(--text-main)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: active ? 700 : 400,
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang.flag} {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Account ── */}
        <SectionCard title={t('settings.account')}>
          <div className="settings-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}>
            <span>{t('settings.privacySecurity')}</span>
            <span className="settings-arrow">›</span>
          </div>
          <div className="settings-item">
            <span>{t('settings.helpSupport')}</span>
            <span className="settings-arrow">›</span>
          </div>
        </SectionCard>

        {/* ── About ── */}
        <SectionCard title={t('settings.about')}>
          <div className="settings-item">
            <span>{t('settings.version')}</span>
            <span className="settings-value">1.0.0</span>
          </div>
          <div className="settings-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/terms')}>
            <span>{t('settings.terms')}</span>
            <span className="settings-arrow">›</span>
          </div>
        </SectionCard>

        <button className="signout-btn" onClick={handleSignOut}>
          ➡️ {t('settings.signOut')}
        </button>
      </div>
    </AppLayout>
  );
};
