import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import profile from "../assets/nico.jpeg";
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
});

const TextContainer = styled.div({
    transform: "rotate(-8deg)",
    transformOrigin: "50% 50%",
});

const HomeText = styled.div({
    fontWeight: 700,
    fontSize: 128,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    letterSpacing: 8,
    position: "absolute",
});

const ImageContainer = styled.div({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const AnimatedImage = styled(animated.div)({
    backgroundImage: profile,
    willChange: "transform",
});

const ProfileImage = styled.img({
    width: "40%",
    display: "block",
    height: "auto",
    margin: "auto",
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
        boxShadow: "0px 30px 100px -10px rgba(0, 0, 0, 0.4)",
    },
})


export const Intro: React.FC = () => {
    const [isScrollVisible, setScrollVisible] = useState(true);
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
    const calc = (x: any, y: any) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
    const trans = (x: any, y: any, s: any) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    // const handleScroll = useCallback(() => {
    //     if (document.body.scrollTop === 0) {
    //         setScrollVisible(true);
    //     }
    //     isScrollVisible && setScrollVisible(false);
    // }, []);

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    // }, [handleScroll]);

    return (
        <IntroContainer onScroll={(e) => console.log("HELLO")}>
            <ImageContainer>
                <div style={{ zIndex: 1 }}>
                    <AnimatedImage
                        style={{
                            transform: props.xys.interpolate(trans as any),
                        }}
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                    >
                        <ProfileImage src={profile} />
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
                    Hello&thinsp;Ciao&thinsp;Hola&thinsp;Hello&thinsp;Ciao&thinsp;Hola&thinsp;
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
                    Hello&thinsp;Ciao&thinsp;Hola&thinsp;Hello&thinsp;Ciao&thinsp;Hola&thinsp;
                </HomeText>
            </TextContainer>
            {isScrollVisible && <Scroll />}
        </IntroContainer>
    );
};
