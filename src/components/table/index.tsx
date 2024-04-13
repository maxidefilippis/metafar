import styles from './index.module.css';

interface RenderTableProps {
    children: JSX.Element | JSX.Element[];
}
export const Table = ({ children }: RenderTableProps) => {
    return <div className={styles.currenciesTable}>{children}</div>;
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
        <span
            className={styles.cell}
            onClick={onClick}
        >
            {data}
        </span>
    );
};
