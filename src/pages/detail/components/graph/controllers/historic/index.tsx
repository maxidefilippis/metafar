import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { setTimeFrom, setTimeTo } from '../../../../../../redux/reducers/detailSlice';
import { InputTime } from '../../../../../../components/inputTime';
import { GraphType } from '../../../../../../constants/graphType';
import styles from './historicGraphParams.module.css';

export const HistoricGraphParams = () => {
    const { t } = useTranslation('detail');
    const dispatch = useAppDispatch();
    const { timeFrom, timeTo, graphType } = useAppSelector((store) => store.detail);

    const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === t('TIME_FROM') && dispatch(setTimeFrom(event.target.value));
        event.target.id === t('TIME_TO') && dispatch(setTimeTo(event.target.value));
    };

    if (graphType !== GraphType.HISTORY) return;

    return (
        <div className={styles.historicParams}>
            <InputTime id={t('TIME_FROM')} label={t('TIME_FROM')} value={timeFrom} onChange={handleChangeTime} />
            <InputTime id={t('TIME_TO')} label={t('TIME_TO')} value={timeTo} onChange={handleChangeTime} />
        </div>
    );
};
