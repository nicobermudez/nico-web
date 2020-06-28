import styled from "@emotion/styled";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import profileImage from "src/assets/nico.jpeg";
import mobileProfileImage from "src/assets/nico-mobile.jpeg";
import { mediaQueries } from "src/constants/media-queries";
import { Scroll } from "./Scroll";

const IntroContainer = styled.div({
    backgroundColor: "#16181d",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    position: "relative",
    overflow: "hidden",
    paddingTop: 16,
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
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const AnimatedImage = styled(animated.div)({
    backgroundImage: profileImage,
    willChange: "transform",
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
        maxWidth: "calc(60vw - 64px)",
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

export const Intro: React.FC = () => {
    const [isScrollVisible, setScrollVisible] = useState(true);
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
    const calc = (x: any, y: any) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
    const trans = (x: any, y: any, s: any) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    useScrollPosition(({ currPos }) => {
        currPos.y === 0
            ? setScrollVisible(true)
            : setScrollVisible(false);
    });

    return (
        <IntroContainer>
            <ImageContainer>
                <div style={{ zIndex: 1 }}>
                    <AnimatedImage
                        style={{
                            transform: props.xys.interpolate(trans as any),
                        }}
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                    >
                        <ProfileImage src={profileImage} />
                        <ProfileImageMobile src={mobileProfileImage} />
                    </AnimatedImage>
                </div>
            </ImageContainer>
            <TextContainer style={{ zIndex: 0 }}>
                <HomeText
                    style={{
                        bottom: 0,
                        color: "lightblue",
                        left: "-60vw",
                    }}
                >
                    Hola&thinsp;Ciao&thinsp;Hello&thinsp;Hola&thinsp;Ciao&thinsp;Hello&thinsp;
                </HomeText>
            </TextContainer>
            <TextContainer style={{ zIndex: 2 }}>
                <HomeText
                    style={{
                        top: 0,
                        WebkitTextStroke: "1px white",
                        color: "transparent",
                        left: "-55vw",
                    }}
                >
                    Hola&thinsp;Ciao&thinsp;Hello&thinsp;Hola&thinsp;Ciao&thinsp;Hello&thinsp;
                </HomeText>
            </TextContainer>
            {isScrollVisible && <Scroll setScrollVisible={setScrollVisible} />}
        </IntroContainer>
    );
};
