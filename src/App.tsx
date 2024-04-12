import { useTranslation } from 'react-i18next';
import { Layout } from './layout';

import './App.css';

function App() {
    const { t } = useTranslation('layout');

    return (
        <Layout>
            <h1>{t('TITLE')}</h1>
        </Layout>
    );
}

export default App;
