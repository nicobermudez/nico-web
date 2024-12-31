import styles from "./Intro.module.css";

export const IntroText: React.FC = () => {
    return (
        <>
            <div className={styles.textContainer}>
                <div className={styles.homeText}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <span key={index}>Hola&thinsp;</span>
                    ))}
                </div>
            </div>
            <div className={styles.textContainerOutline}>
                <div className={styles.homeTextOutline}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <span key={index}>Hola&thinsp;</span>
                    ))}
                </div>
            </div>
        </>
    );
};
