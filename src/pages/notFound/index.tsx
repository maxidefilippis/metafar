import { useTranslation } from 'react-i18next';
import { BackButton } from '../../components/backButton';
import { Typography } from '../../components/typografhy';
import styles from './index.module.css';
import { TextType } from '../../constants/textType';

export const NotFoundPage = () => {
    const { t } = useTranslation('components');

    return (
        <div className={styles.notFound}>
            <Typography text={t('NOT_FOUND')} type={TextType.SUBTITLE} />
            <BackButton />
        </div>
    );
};
