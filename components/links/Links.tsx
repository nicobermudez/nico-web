import React from "react";
import Link from "next/link";
import styles from "./Links.module.css";

export const Links: React.FC = () => {
    return (
        <div className={styles.container}>
            <Link
                target="_blank"
                href="https://github.com/nicobermudez"
                className={styles.link}
            >
                GitHub
            </Link>
            <Link
                target="_blank"
                href="https://www.linkedin.com/in/nicolasbermudezco/"
                className={styles.link}
            >
                CV
            </Link>
            <Link
                target="_blank"
                href="https://soundcloud.com/nicobermudez16"
                className={styles.link}
            >
                SoundCloud
            </Link>
        </div>
    );
};
