import { useTranslation } from 'react-i18next';
import { Action } from '../../../models/action';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '../../../components/table';

interface ActionsTableProps {
    actions: Action[];
}
export const ActionsTable = ({ actions }: ActionsTableProps) => {
    const { t } = useTranslation('home');
    const navigate = useNavigate();

    const handleElementDetail = () => {
        navigate('/detail');
    };
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
                    <TableCell
                        onClick={handleElementDetail}
                        data={element.symbol}
                    />
                    <TableCell data={element.name} />
                    <TableCell data={element.currency} />
                    <TableCell data={element.type} />
                </TableRow>
            ))}
        </>
    );
};
