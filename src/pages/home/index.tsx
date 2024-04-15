import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { SearcIcon } from '../../components/icons/searchIcon';
import { InputText } from '../../components/input';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { pageSize } from '../../constants/globals';
import { Action } from '../../models/action';
import { TextType } from '../../constants/textType';
import { getStockFromApi } from '../../redux/actions/getStock';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActionDetail } from '../../redux/reducers/detailSlice';
import { setFilteredActions, setSearch } from '../../redux/reducers/stockSlice';
import { ActionsTable } from './components/actionsTable';
import styles from './index.module.css';

export const HomePage = () => {
    const { t } = useTranslation('home');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
    const seeActionDetail = (element: Action) => {
        dispatch(setActionDetail(element));
        navigate(`/detail/${element.symbol}/${element.exchange}`);
    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        dispatch(setSearch(search));

        if (search) {
            const actionsFiltered = actions.filter((action) => {
                const searchMatchesName = action.name.toLowerCase().includes(search.toLowerCase());
                const searchMatchesSymbol = action.symbol.toLocaleLowerCase().includes(search.toLowerCase());
                return searchMatchesName || searchMatchesSymbol;
            });
            dispatch(setFilteredActions(actionsFiltered));
        } else {
            dispatch(setFilteredActions([]));
        }
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

    if (loading) return <Skeleton rows={14} />;

    return (
        <>
            <div className={styles.title}>
                <Typography type={TextType.TITLE} text={t('HOME.TITLE')} />
                <div className={styles.searchBox}>
                    <SearcIcon size={20} />
                    <InputText value={search} onChange={(e) => handleFilterChange(e)} />
                </div>
            </div>
            <div className={styles.table}>
                <Table heigth={470} children={<ActionsTable actions={actionsList} seeDetail={seeActionDetail} />} />
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
