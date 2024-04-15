import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import styles from './index.module.css';

interface BackButtonProps {
    route?: string;
}
export const BackButton = ({ route = '/' }: BackButtonProps) => {
    const { t } = useTranslation('components');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(route);
    };
    return (
        <div className={styles.backButton}>
            <Button onClick={handleGoBack}>{t('BACK_BUTTON.TEXT')}</Button>
        </div>
    );
};
