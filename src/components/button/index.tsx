import styles from './index.module.css';

interface ButtonProps {
    children: string;
    onClick: () => void;
}
export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );
};
