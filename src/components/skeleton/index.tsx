import styles from './index.module.css';

interface SkeletonProps {
    rows: number;
}
export const Skeleton: React.FC<SkeletonProps> = ({ rows }) => {
    const rowsArray = Array(rows).fill('');
    return (
        <div className={styles.skeleton}>
            {rowsArray.map((_, index) => (
                <div
                    className={styles.skeletonBlock}
                    key={index}
                />
            ))}
        </div>
    );
};
