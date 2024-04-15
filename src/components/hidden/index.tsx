import { ReactNode } from 'react';
import styles from './index.module.css';

interface HideOnMobileProps {
    children: ReactNode;
}
export const HideOnMobile = ({ children }: HideOnMobileProps) => {
    return <div className={styles.hide}>{children}</div>;
};
