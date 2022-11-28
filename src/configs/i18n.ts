import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from '../locales/english.json';
import vietnamese from '../locales/vietnamese.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: english },
        vi: { translation: vietnamese },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
