import styled from "@emotion/styled";
import React from "react";
import { colors, mediaQueries } from "@app/theme";
import { forwardRef } from "react";

const AboutContainer = styled.div({
    backgroundColor: "#16181d",
    alignItems: "center",
    fontFamily: "sans-serif",
    color: colors.white,
    padding: 32,
    fontSize: 18,
    lineHeight: 2,
    letterSpacing: 1.25,
    [mediaQueries.md]: {
        padding: "25vh 25vw",
        fontSize: 24,
    },
});

const Link = styled.a({
    color: colors.themeLight,
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
});

export const About = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <AboutContainer ref={ref}>
            Hello, my name is Nico. Previously, I studied Finance at&nbsp;
            <Link target="_blank" href="https://www.bu.edu/questrom/">
                Boston University&nbsp;
            </Link>
            and worked in Sales at&nbsp;
            <Link target="_blank" href="https://www.intuit.com/company/">
                Intuit&nbsp;
            </Link>
            &nbsp; and
            <Link
                target="_blank"
                href="https://www.salesforce.com/company/about-us/"
            >
                &nbsp; Salesforce
            </Link>
            . Currently, I'm a Lead Software Engineer at
            <Link target="_blank" href="https://ef.com/">
                &nbsp; Education First
            </Link>
            . If you ever want to grab coffee or chat about coding, the cosmos,
            life, business, or whatever topic you can think of, feel free to
            send me a message via LinkedIn or email me below.
        </AboutContainer>
    );
});
