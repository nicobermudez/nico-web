import { useSpring, animated } from "react-spring";
import Image from "next/image";
import styles from "./Intro.module.css";

export const ProfileImage: React.FC = () => {
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

    return (
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
                    src="/profile.jpeg"
                    alt="Profile Image"
                    width={700}
                    height={700}
                    priority
                />
                <Image
                    className={styles.profileImageMobile}
                    src="/profile-vertical.jpeg"
                    alt="Mobile Profile Image"
                    width={500}
                    height={500}
                    priority
                />
            </animated.div>
        </div>
    );
};
