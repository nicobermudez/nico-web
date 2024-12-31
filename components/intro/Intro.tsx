import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { RefObject, useState } from "react";
import { Scroll } from "../scroll";
import styles from "./Intro.module.css";
import { IntroText } from "./IntroText";
import { ProfileImage } from "./ProfileImage";

export type IntroProps = {
    aboutRef: RefObject<HTMLDivElement>;
};

export const Intro: React.FC<IntroProps> = ({ aboutRef }) => {
    const [isScrollVisible, setScrollVisible] = useState(true);
    useScrollPosition(({ currPos }) => {
        setScrollVisible(currPos.y >= 0);
    });

    return (
        <div className={styles.container}>
            <ProfileImage />
            <IntroText />
            {isScrollVisible && (
                <Scroll
                    setScrollVisible={setScrollVisible}
                    onScroll={() =>
                        aboutRef?.current?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                />
            )}
        </div>
    );
};
