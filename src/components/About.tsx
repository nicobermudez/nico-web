import styled from "@emotion/styled";
import React from "react";

const AboutContainer = styled.div({
    backgroundColor: "#16181d",
    alignItems: "center",
    fontFamily: "sans-serif",
    color: "white",
    padding: "10vh 29vw 20vh 30vw",
    fontSize: 24,
    lineHeight: "3rem",
    letterSpacing: "0.02rem",
});

export const About: React.FC = () => {
    return (
        <AboutContainer>
            Hello! I am a son, brother, friend, and student. 
            I am an adventurer, an athlete, a visual artist, and an innovator; 
            A lover of life. I aim to inspire others to open their minds, to travel, 
            to think beyond any limits, to take chances, and to create.
            Every idea I encounter begins with one simple question: "why?" 
            When we begin to question everything around us and everything within us, 
            we start to understand that the complexity of our society is merely built upon the questions we ask. 
            When we ask these questions daily, we begin to disrupt our own habits, challenge ourselves, 
            grow, and learn like never before. Never stop questioning...
            If you ever want to grab coffee or chat about business, the cosmos, life, 
            technology, or whatever crazy topic you can think of, 
            feel free to send me a message via LinkedIn or email me at bermnicolas@gmail.com. 
        </AboutContainer>
    );
};
