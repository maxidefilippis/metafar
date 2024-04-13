import { Typography } from '../typografhy';
import styles from './index.module.css';

interface RenderTableProps {
    children: JSX.Element | JSX.Element[];
}
export const Table = ({ children }: RenderTableProps) => {
    return <div className={styles.table}>{children}</div>;
};

interface TableRowProps {
    children: JSX.Element | JSX.Element[];
}
export const TableRow = ({ children }: TableRowProps) => {
    return <div className={styles.row}>{children}</div>;
};

interface TableCellProps {
    data: string;
    onClick?: () => void;
}
export const TableCell = ({ data, onClick }: TableCellProps) => {
    return (
        <div
            className={`${styles.cell} ${onClick && styles.link}`}
            onClick={onClick}
        >
            <Typography text={data} />
        </div>
    );
};
