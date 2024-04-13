import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/button';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { apiUrl, pageSize } from '../../constants/globals';
import { Action } from '../../models/action';
import { StockResponse, emptyStockResponse } from '../../models/apiResponse';
import { TextType } from '../../models/textType';
import { ActionsTable } from './components/actionsTable';
import styles from './index.module.css';

export const Home = () => {
    const { t } = useTranslation('home');
    const [data, setData] = useState<StockResponse>(emptyStockResponse());
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [actions, setActions] = useState<Action[]>([]);

    const firstElement = useMemo(() => (currentPage - 1) * pageSize, [currentPage]);
    const lastElement = useMemo(() => currentPage * pageSize, [currentPage]);

    useEffect(() => {
        setActions(data.data.slice(firstElement, lastElement));
    }, [data, currentPage]);

    const totalPages = useMemo(() => Math.ceil(data.count / 20), [data]);

    const handleBack = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleNext = () => {
        setCurrentPage((page) => page + 1);
    };

    useEffect(() => {
        fetch(`${apiUrl}/stocks`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Skeleton rows={12} />;

    return (
        <>
            <div className={styles.title}>
                <Typography type={TextType.TITLE} text={t('HOME.TITLE')} />
            </div>
            <div className={styles.table}>
                <Table children={<ActionsTable actions={actions} />} />
            </div>
            <div className={styles.results}>
                <Typography type={TextType.TEXT} text={t('TABLE.PAGE', { currentPage, totalPages })}
                />
                <div className={styles.buttons}>
                    <Button onClick={handleBack} disabled={currentPage <= 1}>{t('BUTTONS.BACK')}</Button>
                    <Button onClick={handleNext} disabled={currentPage >= totalPages}>{t('BUTTONS.NEXT')}</Button>
                </div>
                <Typography type={TextType.TEXT} text={t('TABLE.RESULTS', { pageSize, count: data.count })} />
            </div>
        </>
    );
};
