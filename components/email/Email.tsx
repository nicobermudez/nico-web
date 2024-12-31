import React from "react";
import { FiCornerDownRight } from "react-icons/fi";
import Link from "next/link";
import styles from "./Email.module.css";

export const Email: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center space-x-2">
                <FiCornerDownRight className={styles.icon} />
                <Link
                    href="mailto:bermnicolas@gmail.com"
                    target="_blank"
                    className={styles.link}
                >
                    bermnicolas@gmail.com
                </Link>
            </div>
        </div>
    );
};
