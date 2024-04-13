import styles from './index.module.css';

interface ButtonProps {
    text: string;
    action: () => void;
}
export const Button = ({ text, action }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            onClick={action}
        >
            {text}
        </button>
    );
};
