import styles from './index.module.css';

interface LayoutProps {
    children: JSX.Element;
}
export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header className={styles.header}></header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}></footer>
        </>
    );
};
