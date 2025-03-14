import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../i18n/locales/en.json';
import frTranslations from '../i18n/locales/fr.json';

// Only initialize if it hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        fr: {
          translation: frTranslations,
        },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      // Disable suspense mode which can cause hydration issues
      react: {
        useSuspense: false
      }
    });
}

export default i18n;