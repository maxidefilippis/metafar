import { useTranslation } from 'react-i18next';
import styles from './index.module.css';
import { Typography } from '../components/typografhy';
import { TextType } from '../models/textType';

interface LayoutProps {
    children: JSX.Element;
}
export const Layout = ({ children }: LayoutProps) => {
    const { t } = useTranslation('layout');
    return (
        <>
            <header className={styles.header}>
                <Typography
                    type={TextType.MAIN_TITLE}
                    text={t('TITLE')}
                />
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <Typography
                    type={TextType.TEXT}
                    text={t('FOOTER')}
                />
            </footer>
        </>
    );
};
