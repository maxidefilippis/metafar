import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioButton } from '../../../../../../components/radioButton';
import { Interval } from '../../../../../../constants/intervals';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { setIntervalTime } from '../../../../../../redux/reducers/detailSlice';
import styles from './realtimeGraphParams.module.css';

export const RealTimeGraphParams = () => {
    const { t } = useTranslation('detail');
    const dispatch = useAppDispatch();
    const { interval } = useAppSelector((store) => store.detail);

    const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIntervalTime(event.target.value));
    };

    const realTimeValues = useMemo(() => [Interval.ONE, Interval.FIVE, Interval.FIFTEEN], []);

    return (
        <div className={styles.realTimeParams}>
            <label>{t('INTERVAL')}</label>
            {realTimeValues.map((value, index) => (
                <RadioButton key={index} name="time" value={value} label={value} checked={interval === value} onChange={handleIntervalChange} />
            ))}
        </div>
    );
};
