import { TextType } from '../../models/textType';
import styles from './index.module.css';

interface TypographyProps {
    text: string;
    type?: TextType;
}
export const Typography = ({ text, type = TextType.PARAGRAPH }: TypographyProps) => {
    switch (type) {
        case TextType.MAIN_TITLE:
            return <h1 className={styles.mainTitle}>{text}</h1>;
        case TextType.TITLE:
            return <h2 className={styles.title}>{text}</h2>;
        case TextType.SUBTITLE:
            return <h3 className={styles.subtitle}>{text}</h3>;
        case TextType.PARAGRAPH:
            return <p className={styles.paragraph}>{text}</p>;
        case TextType.TEXT:
            return <span className={styles.text}>{text}</span>;
    }
};
