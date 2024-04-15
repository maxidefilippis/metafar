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
import { SearchBox } from './components/searchBox';
import { StockTable } from './components/stockTable';
import styles from './index.module.css';

export const HomePage = () => {
    const { t } = useTranslation('home');
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((store) => store.global);
    const { actions, search, filteredActions } = useAppSelector((store) => store.stock);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [actionsList, setActionsList] = useState<Action[]>([]);

    const firstElement = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);
    const lastElement = useMemo(() => currentPage * pageSize, [currentPage, pageSize]);
    const totalPages = useMemo(() => {
        const results = search ? filteredActions : actions;
        return Math.ceil(results.length / pageSize) || 1;
    }, [actions, search]);

    const textPages = useMemo(() => t('TABLE.PAGE', { currentPage, totalPages }), [currentPage, totalPages]);
    const textResults = useMemo(
        () => t('TABLE.RESULTS', { pageSize: actionsList.length, count: search ? filteredActions.length : actions.length }),
        [actionsList, search, filteredActions, actions],
    );

    const handleBack = () => {
        setCurrentPage((page) => page - 1);
    };
    const handleNext = () => {
        setCurrentPage((page) => page + 1);
    };

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
                <Typography type={TextType.TEXT} text={textPages} />
                <div className={styles.buttons}>
                    <Button onClick={handleBack} disabled={currentPage <= 1}>
                        {t('BUTTONS.BACK')}
                    </Button>
                    <Button onClick={handleNext} disabled={currentPage >= totalPages}>
                        {t('BUTTONS.NEXT')}
                    </Button>
                </div>
                <Typography type={TextType.TEXT} text={textResults} />
            </div>
        </>
    );
};
