import styled from "@emotion/styled";
import React from "react";
import { mediaQueries } from "@app/theme";

const ScrollContainer = styled.div({
    position: "absolute",
    top: "calc((var(--vh, 1vh) * 100) - 8.2rem)",
    left: "calc(50vw - 3.5rem)",
    textTransform: "uppercase",
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    [mediaQueries.md]: {
        left: "calc(50vw - 5rem)",
        display: "flex",
    },
});

const Text = styled.div(
    {
        marginBottom: 32,
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 8,
        [mediaQueries.md]: {
            fontSize: 24,
        },
    },
    ({ theme }) => ({
        color: theme.palette.typography.secondary,
    }),
);

const Pipe = styled.div(
    {
        width: 1,
        height: "3.5rem",
    },
    ({ theme }) => ({
        backgroundColor: theme.palette.typography.secondary,
    }),
);

export type ScrollProps = {
    onScroll: () => void;
    setScrollVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Scroll: React.FC<ScrollProps> = ({
    onScroll,
    setScrollVisible,
}) => {
    return (
        <ScrollContainer
            onClick={() => {
                onScroll();
                setScrollVisible(false);
            }}
        >
            <Text>Scroll</Text>
            <Pipe />
        </ScrollContainer>
    );
};
