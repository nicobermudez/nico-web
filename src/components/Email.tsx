import styled from "@emotion/styled";
import React from "react";
import { colors } from "src/constants/colors";
import { mediaQueries } from "src/constants/media-queries";
import { FiCornerDownRight } from "react-icons/fi";

const EmailContainer = styled.div({
    textAlign: "center",
    margin: "0 16px 128px 16px",
    [mediaQueries.md]: {
        margin: "0 16px 256px 16px",
    },
});

const Link = styled.a({
    fontFamily: "sans-serif",
    fontWeight: 700,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: colors.themeLight,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
        WebkitTextStroke: "1px white",
        color: "transparent",
    },
    [mediaQueries.md]: {
        letterSpacing: 8,
        fontSize: 32,
    },
});

const Icon = styled(FiCornerDownRight)({
    marginRight: 8,
    color: colors.themeLight,
    fontSize: 12,
    [mediaQueries.md]: {
        fontSize: 24,
    },
});

export const Email: React.FC = () => {
    return (
        <EmailContainer>
            <Icon />
            <Link href="mailto:bermnicolas@gmail.com" target="_blank">bermnicolas@gmail.com</Link>
        </EmailContainer>
    );
};
