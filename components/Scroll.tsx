import styled from "@emotion/styled";
import React from "react";
import ScrollChor from "react-scrollchor";
import { colors, mediaQueries } from "@app/theme";

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

const Text = styled.div({
    marginBottom: 32,
    color: colors.themeLight,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 8,
    [mediaQueries.md]: {
        fontSize: 24,
    },
});

const Pipe = styled.div({
    width: 0,
    borderLeft: `0.1rem solid ${colors.themeLight}`,
    height: "3.5rem",
    backgroundColor: colors.white,
});

export type ScrollProps = {
    setScrollVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Scroll: React.FC<ScrollProps> = ({ setScrollVisible }) => {
    return (
        <ScrollChor to="about">
            <ScrollContainer onClick={() => setScrollVisible(false)}>
                <Text>Scroll</Text>
                <Pipe />
            </ScrollContainer>
        </ScrollChor>
    );
};
