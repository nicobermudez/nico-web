import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/constants/colors";
import { mediaQueries } from "src/constants/media-queries";

const LinksContainer = styled.div({
    position: "absolute",
    top: 32,
    left: 32,
    color: colors.white,
    display: "flex",
    justifyContent: "space-around",
    textTransform: "uppercase",
    zIndex: 2,
    [mediaQueries.md]: {
        position: "fixed",
        top: 64,
        left: 64,
    },
});

const Link = styled.a({
    marginRight: 16,
    cursor: "pointer",
    textDecoration: "none",
    color: colors.white,
});

export const Links: React.FC = () => (
    <LinksContainer>
        <Link target="_blank" href="https://github.com/nicobermudez">Git</Link>
        <Link target="_blank" href="https://www.linkedin.com/in/nicolasbermudezco/">CV</Link>
    </LinksContainer>
);