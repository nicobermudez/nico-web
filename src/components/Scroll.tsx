import styled from "@emotion/styled";
import React from "react";
import { useSpring, animated } from "react-spring";
import { colors } from "../constants/colors";

const ScrollContainer = styled.div({
    position: "absolute",
    top: "calc((var(--vh, 1vh) * 100) - 8.2rem)",
    left: "calc(50vw - 5rem)",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
});

const Text = styled.div({
    marginBottom: 32,
    color: colors.themeLight,
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 8,
});

const Pipe = styled(animated.div)({
    width: 0,
    borderLeft: `0.1rem solid ${colors.themeLight}`,
    height: "5.5rem",
    backgroundColor: colors.white,
});

export const Scroll: React.FC = () => {
    const interp = (i: number) => (r: number) => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`
    const { radians }: any = useSpring({
        to: async (next: (arg0: { radians: number; }) => any) => {
            while (1) await next({ radians: 2 * Math.PI })
        },
        from: { radians: 0 },
        config: { duration: 2500 },
        reset: true,
    });

    return (
        <ScrollContainer>
            <Text>Scroll</Text>
            <Pipe style={{ transform: radians.interpolate(interp(0)) }} />
        </ScrollContainer>
    );
};
