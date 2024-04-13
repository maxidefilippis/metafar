import styles from './index.module.css';

interface ButtonProps {
    children: string;
    onClick: () => void;
    disabled?: boolean;
}
export const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
        >
            <span>{children}</span>
        </button>
    );
};
