import styled from "@emotion/styled";
import React from "react";

const TextContainer = styled.div({
    transform: "rotate(-8deg)",
    transformOrigin: "50% 50%",
});

const HomeText = styled.div({
    transform: "matrix(1, 0, 0, 1, 0, 0)",
    fontWeight: 700,
    fontSize: 128,
    textTransform: "uppercase",
    position: "absolute",
    whiteSpace: "nowrap",
    letterSpacing: 8,
});

export const Intro: React.FC = () => (
    <TextContainer>
        <HomeText
            style={{
                bottom: 0,
                color: "lightblue",
                left: "-60vw",
            }}
        >
            Hello&thinsp;Ciao&thinsp;Hola&thinsp;Hello&thinsp;Ciao&thinsp;Hola&thinsp;
        </HomeText>
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
);
