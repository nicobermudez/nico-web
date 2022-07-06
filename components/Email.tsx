import styled from "@emotion/styled";
import React from "react";
import { mediaQueries } from "@app/theme";
import { FiCornerDownRight } from "react-icons/fi";

const EmailContainer = styled.div({
    textAlign: "center",
    padding: "0 16px 128px 16px",
    [mediaQueries.md]: {
        padding: "0 16px 256px 16px",
    },
});

const Link = styled.a(
    {
        fontWeight: 700,
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 2,
        textDecoration: "none",
        cursor: "pointer",
        [mediaQueries.md]: {
            letterSpacing: 8,
            fontSize: 32,
        },
    },
    ({ theme }) => ({
        color: theme.palette.typography.secondary,
        "&:hover": {
            WebkitTextStroke: `1px ${theme.palette.typography.secondary}`,
            color: "transparent",
        },
    }),
);

const Icon = styled(FiCornerDownRight)(
    {
        marginRight: 8,
        fontSize: 12,
        [mediaQueries.md]: {
            fontSize: 24,
        },
    },
    ({ theme }) => ({
        color: theme.palette.typography.secondary,
    }),
);

export const Email: React.FC = () => {
    return (
        <EmailContainer>
            <Icon />
            <Link href="mailto:bermnicolas@gmail.com" target="_blank">
                bermnicolas@gmail.com
            </Link>
        </EmailContainer>
    );
};
