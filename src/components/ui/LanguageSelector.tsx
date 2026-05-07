import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';

interface LanguageSelectorProps {
  onClose: () => void;
}

export const LanguageSelector = ({ onClose }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const currentCode = i18n.language.split('-')[0];

  const selectLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    onClose();
  };

  return (
    <div className="lang-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lang-sheet" onClick={e => e.stopPropagation()}>
        <div className="lang-handle" />
        <h2 className="lang-title">{t('lang.select')}</h2>
        <div className="lang-list">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-item${currentCode === lang.code ? ' lang-item--active' : ''}`}
              onClick={() => selectLanguage(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.label}</span>
              {currentCode === lang.code && (
                <span className="lang-check" aria-label="selected">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
