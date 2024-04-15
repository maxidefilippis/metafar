import styles from './index.module.css';

interface InputTimeProps {
    id: string;
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const InputTime = ({ id, label, value, onChange }: InputTimeProps) => {
    return (
        <div className={styles.inputTime}>
            {label && <label>{label}</label>}
            <input
                id={id}
                type="datetime-local"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
