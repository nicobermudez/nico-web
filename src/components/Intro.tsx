import styled from "@emotion/styled";
import React from "react";
import profile from "../assets/nico.jpeg";

const IntroContainer = styled.div({
    transform: "rotate(-8deg)",
    transformOrigin: "50% 50%",
});

const HomeText = styled.div({
    transform: "matrix(1, 0, 0, 1, 0, 0)",
    fontWeight: 700,
    fontSize: 128,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    letterSpacing: 8,
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

export const Intro: React.FC = () => (
    <>
        <ImageContainer>
            <div
                style={{
                    transform: "matrix(1, 0, 0, 1, 0, 0)",
                    zIndex: 1,
                }}
            >
                <img
                    style={{
                        width: "40%",
                        display: "block",
                        height: "auto",
                        margin: "auto",

                    }}
                    src={profile} 
                    alt="Profile"
                />
            </div>
        </ImageContainer>
        <IntroContainer>
            <HomeText
                style={{
                    bottom: 0,
                    color: "lightblue",
                    left: "-60vw",
                    zIndex: 0,
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
                    zIndex: 2,
                }}
            >
                Hello&thinsp;Ciao&thinsp;Hola&thinsp;Hello&thinsp;Ciao&thinsp;Hola&thinsp;
            </HomeText>
        </IntroContainer>
    </>
);
