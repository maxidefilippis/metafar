import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/button';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { pageSize } from '../../constants/globals';
import { TextType } from '../../constants/textType';
import { Action } from '../../models/action';
import { getStockFromApi } from '../../redux/actions/getStock';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentPage } from '../../redux/reducers/stockSlice';
import { SearchBox } from './components/searchBox';
import { StockTable } from './components/stockTable';
import styles from './index.module.css';

export const HomePage = () => {
    const { t } = useTranslation('home');
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((store) => store.global);
    const { actions, search, filteredActions, currentPage } = useAppSelector((store) => store.stock);
    const [actionsList, setActionsList] = useState<Action[]>([]);

    const firstElement = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);
    const lastElement = useMemo(() => currentPage * pageSize, [currentPage, pageSize]);
    const totalResults = useMemo(() => (search ? filteredActions : actions), [search, filteredActions, actions]);
    const totalPages = useMemo(() => Math.ceil(totalResults.length / pageSize) || 1, [actions, search]);

    const currentPageNumber = useMemo(() => t('TABLE.PAGE', { currentPage, totalPages }), [currentPage, totalPages]);
    const currentResults = useMemo(() => t('TABLE.RESULTS', { pageSize: actionsList.length, count: totalResults.length }), [actionsList, totalResults]);

    const disableNext = useMemo(() => currentPage <= 1, [currentPage]);
    const disableBack = useMemo(() => currentPage >= totalPages, [currentPage, totalPages]);
    const handleBack = () => dispatch(setCurrentPage(currentPage - 1));
    const handleNext = () => dispatch(setCurrentPage(currentPage + 1));

    useEffect(() => {
        !actions.length && dispatch(getStockFromApi());
    }, []);

    useEffect(() => {
        if (!actions) return;

        let currentsActionsToShow: Action[] = [];

        if (search) currentsActionsToShow = filteredActions.slice(firstElement, lastElement);
        if (!search) currentsActionsToShow = actions.slice(firstElement, lastElement);

        setActionsList(currentsActionsToShow);
    }, [firstElement, lastElement, actions, search, filteredActions]);

    if (loading) return <Skeleton rows={16} />;

    return (
        <>
            <div className={styles.homeTitle}>
                <Typography type={TextType.TITLE} text={t('HOME.TITLE')} />
                <SearchBox />
            </div>
            <div className={styles.table}>
                <Table heigth={565} children={<StockTable actions={actionsList} />} />
            </div>
            <div className={styles.results}>
                <Typography type={TextType.TEXT} text={currentPageNumber} />
                <div className={styles.buttons}>
                    <Button onClick={handleBack} disabled={disableNext}>{t('BUTTONS.BACK')}</Button>
                    <Button onClick={handleNext} disabled={disableBack}>{t('BUTTONS.NEXT')}</Button>
                </div>
                <Typography type={TextType.TEXT} text={currentResults} />
            </div>
        </>
    );
};
