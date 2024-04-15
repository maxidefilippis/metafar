import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/backButton';
import { Skeleton } from '../../components/skeleton';
import { Table } from '../../components/table';
import { Typography } from '../../components/typografhy';
import { apiKey, apiUrl } from '../../constants/globals';
import { GraphType } from '../../constants/graphType';
import { TextType } from '../../constants/textType';
import { setTimeIntervals } from '../../functions/setTimeIntervals';
import { getActionDetailFromApi } from '../../redux/actions/getActionDetail';
import { getActionHistoricPrice } from '../../redux/actions/getActionHistoricPrice';
import { getActionRealTimePrice } from '../../redux/actions/getActionRealTimePrice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DetailData } from './components/data';
import { DetailGraph } from './components/graph';
import { GraphTypeSelector } from './components/graph/controllers/graphType';
import styles from './index.module.css';

export const DetailPage = () => {
    const { t } = useTranslation('detail');
    const dispatch = useAppDispatch();
    const { action, exchange } = useParams();
    const { loading } = useAppSelector((store) => store.global);
    const { actionDetail, graphType, timeFrom, timeTo, interval } = useAppSelector((store) => store.detail);

    const isHistoryGraph = useMemo(() => graphType === GraphType.HISTORY, [graphType]);
    const isRealTimeGraph = useMemo(() => graphType === GraphType.REAL_TIME, [graphType]);

    const getActionDetail = () => {
        if (!actionDetail?.name && action && exchange) {
            dispatch(getActionDetailFromApi(action, exchange));
        }
    };
    const getPricesGraph = () => {
        if (!action || !interval) return;
        if (isRealTimeGraph) dispatch(getActionRealTimePrice({ interval, symbol: action }));
        if (isHistoryGraph) {
            if (!timeFrom || !timeTo) return;
            dispatch(getActionHistoricPrice({ interval, startDate: timeFrom, endDate: timeTo, symbol: action }));
        }
    };

    useEffect(() => {
        getActionDetail();
    }, []);

    useEffect(() => {
        if (isRealTimeGraph) {
            const fetchPricesInRealTime = setInterval(getPricesGraph, setTimeIntervals(interval));
            return () => clearInterval(fetchPricesInRealTime);
        }
    }, [isRealTimeGraph, interval]);

    if (!apiKey || !apiUrl) return <></>;
    return (
        <>
            <div className={styles.detailTitle}>
                {loading && !actionDetail?.name && <Skeleton rows={1} />}
                {<Typography type={TextType.TITLE} text={actionDetail?.name} />}
            </div>
            <div className={styles.table}>
                <Table children={<DetailData />} />
            </div>
            <div className={styles.title}>
                <Typography type={TextType.TITLE} text={t('PRICE')} />
                <GraphTypeSelector />
            </div>
            <div className={styles.table}>
                <Table children={<DetailGraph handleGraph={getPricesGraph} />} />
            </div>
            <BackButton />
        </>
    );
};
