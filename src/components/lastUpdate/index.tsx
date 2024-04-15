import { useMemo } from 'react';
import { Typography } from '../typografhy';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';

interface LastUpdateProps {
    date: string;
}
export const LastUpdate = ({ date }: LastUpdateProps) => {
    const { t } = useTranslation('components');
    const showLastUpdate = useMemo(() => `${t('LAST_UPDATE')} - ${date}`, [date]);

    if (!date) return;
    return (
        <div className={styles.lastUpdate}>
            <Typography text={showLastUpdate} />
        </div>
    );
};
