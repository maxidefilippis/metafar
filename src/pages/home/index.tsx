import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { pageSize } from '../../constants/globals';
import { Action } from '../../models/action';
import { TextType } from '../../models/textType';
import { getStockFromApi } from '../../redux/actions/getStock';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActionDetail } from '../../redux/reducers/stockSlice';
import { ActionsTable } from './components/actionsTable';
import styles from './index.module.css';

export const Home = () => {
    const { t } = useTranslation('home');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { actions, loading } = useAppSelector((store) => store.stock);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const firstElement = useMemo(() => (currentPage - 1) * pageSize, [currentPage]);
    const lastElement = useMemo(() => currentPage * pageSize, [currentPage]);
    const totalPages = useMemo(() => Math.ceil(actions.length / 20), [actions]);
    const actionsList = useMemo(() => actions.slice(firstElement, lastElement), [firstElement, lastElement, actions]);

    const handleBack = () => {
        setCurrentPage((page) => page - 1);
    };
    const handleNext = () => {
        setCurrentPage((page) => page + 1);
    };
    const seeActionDetail = (element: Action) => {
        dispatch(setActionDetail(element));
        navigate(`/detail/${element.symbol}`);
    };

    useEffect(() => {
        !actions.length && dispatch(getStockFromApi());
    }, []);

    if (loading) return <Skeleton rows={12} />;

    return (
        <>
            <div className={styles.title}>
                <Typography type={TextType.TITLE} text={t('HOME.TITLE')} />
            </div>
            <div className={styles.table}>
                <Table children={<ActionsTable actions={actionsList} seeDetail={seeActionDetail}/>} />
            </div>
            <div className={styles.results}>
                <Typography type={TextType.TEXT} text={t('TABLE.PAGE', { currentPage, totalPages })} />
                <div className={styles.buttons}>
                    <Button onClick={handleBack} disabled={currentPage <= 1}>{t('BUTTONS.BACK')}</Button>
                    <Button onClick={handleNext} disabled={currentPage >= totalPages}>{t('BUTTONS.NEXT')}</Button>
                </div>
                <Typography type={TextType.TEXT} text={t('TABLE.RESULTS', { pageSize, count: actions.length })} />
            </div>
        </>
    );
};
