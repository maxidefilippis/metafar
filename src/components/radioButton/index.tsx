import styles from './index.module.css';

interface RadioButtonProps {
    name: string;
    label: string;
    checked: boolean;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const RadioButton = ({ name, label, value, checked, onChange }: RadioButtonProps) => {
    return (
        <div className={styles.radio}>
            <input
                type="radio"
                id={String(value)}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={String(value)}>{label}</label>
        </div>
    );
};
