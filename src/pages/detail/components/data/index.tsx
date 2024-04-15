import { useTranslation } from 'react-i18next';
import { Typography } from '../../../../components/typografhy';
import { useAppSelector } from '../../../../redux/hooks';
import styles from './index.module.css';
import { Skeleton } from '../../../../components/skeleton';

export const DetailData = () => {
    const { t } = useTranslation('detail');
    const { actionDetail } = useAppSelector((store) => store.detail);

    if (!actionDetail?.name) return <Skeleton rows={2} />;

    return (
        <div className={styles.dataContainer}>
            <DataProp label={t('PROPERTY.SYMBOL')} value={actionDetail?.symbol} />
            <DataProp label={t('PROPERTY.MIC_CODE')} value={actionDetail?.mic_code} />
            <DataProp label={t('PROPERTY.CURRENCY')} value={actionDetail?.currency} />
            <DataProp label={t('PROPERTY.EXCHANGE')} value={actionDetail?.exchange} />
            <DataProp label={t('PROPERTY.COUNTRY')} value={actionDetail?.country} />
            <DataProp label={t('PROPERTY.TYPE')} value={actionDetail?.type} />
        </div>
    );
};

const DataProp = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className={styles.property}>
            <label>{label}</label>
            <Typography text={value} />
        </div>
    );
};
