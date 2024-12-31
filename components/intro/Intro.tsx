import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { RefObject, useState } from "react";
import { useSpring, animated } from "react-spring";
import profileImage from "@app/assets/nico.jpeg";
import profileImageMobile from "@app/assets/nico-mobile.jpeg";
import { Scroll } from "../scroll";
import Image from "next/image";
import styles from "./Intro.module.css";

export type IntroProps = {
    aboutRef: RefObject<HTMLDivElement>;
};

export const Intro: React.FC<IntroProps> = ({ aboutRef }) => {
    const [isScrollVisible, setScrollVisible] = useState(true);
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 },
    }));

    const calc = (x: number, y: number) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1.1,
    ];

    const trans = (x: number, y: number, s: number) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    useScrollPosition(({ currPos }) => {
        setScrollVisible(currPos.y >= 0);
    });

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <animated.div
                    className={styles.animatedImage}
                    style={{
                        transform: props.xys.to(trans),
                    }}
                    onMouseMove={({ clientX: x, clientY: y }) =>
                        set({ xys: calc(x, y) })
                    }
                    onMouseLeave={() => set({ xys: [0, 0, 1] })}
                >
                    <Image
                        className={styles.profileImage}
                        src={profileImage.src}
                        alt="Profile Image"
                        width={700}
                        height={700}
                    />
                    <Image
                        className={styles.profileImageMobile}
                        src={profileImageMobile.src}
                        alt="Mobile Profile Image"
                        width={500}
                        height={500}
                    />
                </animated.div>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.homeText}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <span key={index}>Hallo&thinsp;</span>
                    ))}
                </div>
            </div>
            <div className={styles.textContainerOutline}>
                <div className={styles.homeTextOutline}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <span key={index}>Hallo&thinsp;</span>
                    ))}
                </div>
            </div>
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
