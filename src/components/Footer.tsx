import styled from "@emotion/styled";
import React from "react";
import { colors } from "../constants/colors";
import { mediaQueries } from "../constants/media-queries";

const FooterContainer = styled.div({
    position: "absolute",
    top: 64,
    left: 64,
    color: colors.white,
    display: "flex",
    justifyContent: "space-around",
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    [mediaQueries.md]: {
        position: "fixed",
    },
});

const Link = styled.a({
    marginRight: 16,
    cursor: "pointer",
    textDecoration: "none",
    color: colors.white,
});

export const Footer: React.FC = () => (
    <FooterContainer>
        <Link target="_blank" href="https://github.com/nicobermudez">Git</Link>
        <Link target="_blank" href="https://www.linkedin.com/in/nicolasbermudezco/">CV</Link>
    </FooterContainer>
);
