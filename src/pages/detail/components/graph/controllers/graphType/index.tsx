import { useTranslation } from 'react-i18next';
import { RadioButton } from '../../../../../../components/radioButton';
import { GraphType } from '../../../../../../constants/graphType';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { setGraphType } from '../../../../../../redux/reducers/detailSlice';
import styles from './graphTypeSelector.module.css';

export const GraphTypeSelector = () => {
    const { t } = useTranslation('detail');
    const dispatch = useAppDispatch();
    const { graphType } = useAppSelector((store) => store.detail);

    const handleGraphType = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setGraphType(event.target.value as GraphType));
    };

    return (
        <div className={styles.graphType}>
            <RadioButton
                name="graphType"
                value={GraphType.HISTORY}
                label={t('GRAPH_TYPE.HISTORY')}
                checked={graphType === GraphType.HISTORY}
                onChange={handleGraphType}
            />
            <RadioButton
                name="graphType"
                value={GraphType.REAL_TIME}
                label={t('GRAPH_TYPE.REAL_TIME')}
                checked={graphType === GraphType.REAL_TIME}
                onChange={handleGraphType}
            />
        </div>
    );
};
