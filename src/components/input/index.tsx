import styles from './index.module.css';

interface InputTextProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const InputText = ({ value, onChange }: InputTextProps) => {
    return (
        <input
            className={styles.input}
            value={value}
            onChange={onChange}
        />
    );
};
