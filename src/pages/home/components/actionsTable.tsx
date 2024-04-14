import { useTranslation } from 'react-i18next';
import { TableCell, TableRow } from '../../../components/table';
import { Action } from '../../../models/action';

interface ActionsTableProps {
    actions: Action[];
    seeDetail: (action: Action) => void;
}
export const ActionsTable = ({ actions, seeDetail }: ActionsTableProps) => {
    const { t } = useTranslation('home');

    return (
        <>
            <TableRow>
                <TableCell data={t('TABLE.ROWS.SYMBOL')} />
                <TableCell data={t('TABLE.ROWS.NAME')} />
                <TableCell data={t('TABLE.ROWS.CURRENCY')} />
                <TableCell data={t('TABLE.ROWS.TYPE')} />
            </TableRow>
            {actions.map((element, index) => (
                <TableRow key={index}>
                    <TableCell onClick={() => seeDetail(element)} data={element.symbol} />
                    <TableCell data={element.name} />
                    <TableCell data={element.currency} />
                    <TableCell data={element.type} />
                </TableRow>
            ))}
        </>
    );
};
