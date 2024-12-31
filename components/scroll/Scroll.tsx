import React, { useEffect } from "react";
import styles from "./Scroll.module.css";

export type ScrollProps = {
    onScroll: () => void;
    setScrollVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Scroll: React.FC<ScrollProps> = ({
    onScroll,
    setScrollVisible,
}) => {
    return (
        <div
            className={styles.container}
            onClick={() => {
                onScroll();
                setScrollVisible(false);
            }}
        >
            <div className={styles.text}>Scroll</div>
            <div className={styles.pipe} />
        </div>
    );
};
