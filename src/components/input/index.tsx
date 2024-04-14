import styles from './index.module.css';

interface InputProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({ value, onChange }: InputProps) => {
    return (
        <input
            className={styles.input}
            value={value}
            onChange={onChange}
        />
    );
};
