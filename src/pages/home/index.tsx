import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { apiUrl, pageSize } from '../../constants/globals';
import { Action } from '../../models/action';
import { StockResponse, emptyStockResponse } from '../../models/apiResponse';
import { ActionsTable } from './components/actionsTable';

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
            <div>
                <Typography text={t('TABLE.PAGE', { currentPage, totalPages })} />
                <Typography text={t('TABLE.RESULTS', { pageSize, count: data.count })} />
            </div>
            <hr />
            <Table>
                <ActionsTable actions={actions} />
            </Table>

            <hr />
            <div>
                {currentPage > 1 && <button onClick={handleBack}>{t('BUTTONS.BACK')}</button>}
                {currentPage < totalPages && <button onClick={handleNext}>{t('BUTTONS.NEXT')}</button>}
            </div>
        </>
    );
};
