import styled from "@emotion/styled";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { RefObject, useState } from "react";
import { useSpring, animated } from "react-spring";
import { mediaQueries } from "@app/theme";
import profileImage from "@app/public/nico.jpeg";
import profileImageMobile from "@app/public/nico-mobile.jpeg";
import { Scroll } from "./Scroll";
import { UserGeolocationData } from "@app/middleware";
import { useTheme } from "@emotion/react";

const IntroContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: 16,
    minHeight: "100vh",
    [mediaQueries.md]: {
        paddingTop: 0,
    },
});

const TextContainer = styled.div({
    transform: "rotate(-8deg)",
    transformOrigin: "50% 50%",
});

const HomeText = styled.div({
    fontWeight: 700,
    fontSize: 32,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    letterSpacing: 8,
    position: "absolute",
    [mediaQueries.md]: {
        fontSize: 128,
    },
});

const ImageContainer = styled.div({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const AnimatedImage = styled(animated.div)({
    willChange: "transform",
    zIndex: 1,
});

const ProfileImage = styled.img({
    display: "none",
    [mediaQueries.sm]: {
        display: "block",
        height: "auto",
        maxWidth: "calc(100vw - 64px)",
        margin: "0 32px",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
        "&:hover": {
            boxShadow: "0px 30px 100px -10px rgba(0, 0, 0, 0.4)",
        },
    },
    [mediaQueries.md]: {
        maxWidth: "calc(60vw - 128px)",
    },
});

const ProfileImageMobile = styled.img({
    display: "block",
    height: "auto",
    maxWidth: "calc(100vw - 64px)",
    margin: "0 32px",
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
        boxShadow: "0px 30px 100px -10px rgba(0, 0, 0, 0.4)",
    },
    [mediaQueries.sm]: {
        display: "none",
    },
});

export type IntroProps = {
    aboutRef: RefObject<HTMLDivElement>;
} & Pick<UserGeolocationData, "greeting">;

export const Intro: React.FC<IntroProps> = ({ greeting, aboutRef }) => {
    const theme = useTheme();
    const [isScrollVisible, setScrollVisible] = useState(true);
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 },
    }));
    const calc = (x: any, y: any) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1.1,
    ];
    const trans = (x: any, y: any, s: any) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    useScrollPosition(({ currPos }) => {
        currPos.y >= 0 ? setScrollVisible(true) : setScrollVisible(false);
    });

    return (
        <IntroContainer>
            <ImageContainer>
                <AnimatedImage
                    style={{
                        transform: props.xys.to(trans as any),
                    }}
                    onMouseMove={({ clientX: x, clientY: y }) =>
                        set({ xys: calc(x, y) })
                    }
                    onMouseLeave={() => set({ xys: [0, 0, 1] })}
                >
                    <ProfileImage
                        src={profileImage.src}
                        alt="Picture of me in the desert"
                    />
                    <ProfileImageMobile
                        src={profileImageMobile.src}
                        alt="Picture of me in the desert"
                    />
                </AnimatedImage>
            </ImageContainer>
            <TextContainer style={{ zIndex: 0 }}>
                <HomeText
                    style={{
                        bottom: 0,
                        color: theme.palette.typography.secondary,
                        left: "-60vw",
                    }}
                >
                    {Array(6)
                        .fill("")
                        .map((_, index) => (
                            <span key={index}>{greeting}&thinsp;</span>
                        ))}
                </HomeText>
            </TextContainer>
            <TextContainer style={{ zIndex: 2 }}>
                <HomeText
                    style={{
                        top: 0,
                        WebkitTextStroke: `1px ${theme.palette.typography.secondary}`,
                        color: "transparent",
                        left: "-55vw",
                    }}
                >
                    {Array(6)
                        .fill("")
                        .map((_, index) => (
                            <span key={index}>{greeting}&thinsp;</span>
                        ))}
                </HomeText>
            </TextContainer>
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
        </IntroContainer>
    );
};
