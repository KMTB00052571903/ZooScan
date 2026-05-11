import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';
import it from './locales/it';
import de from './locales/de';

const savedLang = localStorage.getItem('zooscan_lang') ?? 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
      it: { translation: it },
      de: { translation: de },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
