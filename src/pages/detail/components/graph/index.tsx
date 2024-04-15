import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/button';
import { ChartGraph } from '../../../../components/graph';
import { LastUpdate } from '../../../../components/lastUpdate';
import { Skeleton } from '../../../../components/skeleton';
import { Typography } from '../../../../components/typografhy';
import { StatusCode } from '../../../../constants/statusCode';
import { useAppSelector } from '../../../../redux/hooks';
import { HistoricGraphParams } from './controllers/historic';
import { RealTimeGraphParams } from './controllers/realTime';
import styles from './index.module.css';
import { GraphType } from '../../../../constants/graphType';
import { TextType } from '../../../../constants/textType';

interface DetailGraphProps {
    handleGraph: () => void;
}
export const DetailGraph = ({ handleGraph }: DetailGraphProps) => {
    const { t } = useTranslation('detail');
    const { loading } = useAppSelector((store) => store.global);
    const { timeSerie, lastUpdate, interval, graphType, timeFrom, timeTo } = useAppSelector((store) => store.detail);

    const yAxis = useMemo(() => timeSerie.values.map((value) => parseFloat(value.close)), [timeSerie]);
    const xAxis = useMemo(() => timeSerie.values.map((value) => value.datetime).reverse(), [timeSerie]);

    const invalidDates = graphType === GraphType.HISTORY && new Date(timeFrom) >= new Date(timeTo);
    const isGraphDisabled = loading || !interval || (graphType === GraphType.HISTORY && (!timeFrom || !timeTo)) || invalidDates;

    return (
        <div className={styles.chartContainer}>
            <div className={styles.controls}>
                <RealTimeGraphParams />
                <HistoricGraphParams />
                <Button onClick={handleGraph} disabled={isGraphDisabled}>
                    {t('GRAPH')}
                </Button>
            </div>
            <div className={styles.errorsContainer}>
                {invalidDates && <Typography text={t('ERRORS.DATES')} type={TextType.TEXT} />}
            </div>
            <div className={styles.graph}>
                {loading ? (
                    <Skeleton rows={5} />
                ) : (
                    <>
                        {timeSerie?.status === StatusCode.NONE && <Typography text={t('ERRORS.PARAMETERS')} />}
                        {timeSerie?.status === StatusCode.ERROR && <Typography text={t('ERRORS.NO_DATA_AVAILABLE')} />}
                        {timeSerie?.status === StatusCode.OK && <ChartGraph xAxis={xAxis} yAxis={yAxis} />}
                        <LastUpdate date={lastUpdate} />
                    </>
                )}
            </div>
        </div>
    );
};
