import { useTranslation } from 'react-i18next';
import { TableCell, TableRow } from '../../../../components/table';
import { Action } from '../../../../models/action';
import styles from './index.module.css';
import { setActionDetail } from '../../../../redux/reducers/detailSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { HideOnMobile } from '../../../../components/hidden';

interface StockTableProps {
    actions: Action[];
}
export const StockTable = ({ actions }: StockTableProps) => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const seeActionDetail = (element: Action) => {
        dispatch(setActionDetail(element));
        navigate(`/detail/${element.symbol}/${element.exchange}`);
    };

    return (
        <div className={styles.stockTable}>
            <TableRow>
                <TableCell data={t('TABLE.ROWS.SYMBOL')} />
                <TableCell data={t('TABLE.ROWS.NAME')} />
                <HideOnMobile children={<TableCell data={t('TABLE.ROWS.CURRENCY')} />} />
                <HideOnMobile children={<TableCell data={t('TABLE.ROWS.TYPE')} />} />
            </TableRow>
            {actions.map((element, index) => (
                <TableRow key={index}>
                    <TableCell onClick={() => seeActionDetail(element)} data={element.symbol} />
                    <TableCell data={element.name} />
                    <HideOnMobile children={<TableCell data={element.currency} />} />
                    <HideOnMobile children={<TableCell data={element.type} />} />
                </TableRow>
            ))}
        </div>
    );
};
