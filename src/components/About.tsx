import styled from "@emotion/styled";
import React from "react";
import { colors } from "../constants/colors";
import { mediaQueries } from "../constants/media-queries";

const AboutContainer = styled.div({
    backgroundColor: "#16181d",
    alignItems: "center",
    fontFamily: "sans-serif",
    color: colors.white,
    padding: "10vh 16px 20vh 16px",
    fontSize: 18,
    lineHeight: "3rem",
    letterSpacing: "0.02rem",
    [mediaQueries.md]: {
        padding: "30vh 25vw",
        fontSize: 24,
    },
});

const Link = styled.a({
    color: colors.themeLight,
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
});

export const About: React.FC = () => {
    return (
        <AboutContainer id="about">
            Hello, my name is Nico Bermudez. I am a creative software engineer, thinker, and aspiring entrepreneur. 
            In a previous life, I studied Finance at <Link target="_blank" href="http://www.bu.edu/questrom/">Boston University</Link>. 
            and worked in Sales at <Link target="_blank" href="https://www.intuit.com/company/">Intuit </Link> and 
            <Link target="_blank" href="https://www.salesforce.com/company/about-us/"> Salesforce</Link>. 
            Currently, I'm an adventurer, athlete, innovator, a lover of life. I aim to inspire others to open their minds, to travel, 
            to think beyond any limits, to take chances, and to create. Oh, and I'm also a Software Engineer at 
            <Link target="_blank" href="https://www.goaheadtours.com/"> EF Go Ahead Tours</Link>.
            If you ever want to grab coffee or chat about coding, the cosmos, life,
            business, or whatever crazy topic you can think of,
            feel free to send me a message via LinkedIn or email me below.
        </AboutContainer>
    );
};
