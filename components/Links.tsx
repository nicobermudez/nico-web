import styled from "@emotion/styled";
import React from "react";
import { mediaQueries } from "@app/theme";

const LinksContainer = styled.div({
    position: "absolute",
    top: 32,
    left: 32,
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

const Link = styled.a(
    {
        marginRight: 16,
        cursor: "pointer",
        textDecoration: "none",
    },
    ({ theme }) => ({
        color: theme.palette.typography.secondary,
        "&:active": {
            color: theme.palette.typography.secondary,
        },
    }),
);

export const Links: React.FC = () => (
    <LinksContainer>
        <Link target="_blank" href="https://github.com/nicobermudez">
            GitHub
        </Link>
        <Link
            target="_blank"
            href="https://www.linkedin.com/in/nicolasbermudezco/"
        >
            CV
        </Link>
    </LinksContainer>
);
