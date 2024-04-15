import styles from './serchIcon.module.css';

interface IconProps {
    size: number;
}
export const SearcIcon = ({ size }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size ? `${size}px` : `1em`}
            height={size ? `${size}px` : `1em`}
            viewBox="0 0 24 24"
            className={styles.searchIcon}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
            />
        </svg>
    );
};
