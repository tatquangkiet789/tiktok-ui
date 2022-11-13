import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from '../i18n/english.json';
import vietnamese from '../i18n/vietnamese.json';

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
