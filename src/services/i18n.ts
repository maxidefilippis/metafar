import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { components_es, home_es, layout_es } from '../translations';

i18next.use(initReactI18next).init({
    lng: 'es',
    debug: true,
    resources: {
        es: {
            layout: layout_es,
            components: components_es,
            home: home_es,
        },
    },
});
