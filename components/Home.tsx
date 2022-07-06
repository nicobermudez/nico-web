import { NextQuery } from "@app/middleware";
import styled from "@emotion/styled";
import { useRef } from "react";
import { About } from "./About";
import { Email } from "./Email";
import { Intro } from "./Intro";
import { Links } from "./Links";
import { Tip } from "./Tip";

const Wrapper = styled.div(
    {
        fontFamily: "sans-serif",
        position: "relative",
    },
    ({ theme }) => ({
        backgroundColor: theme.palette.surfaces.default,
    }),
);

export type HomeProps = Omit<NextQuery, "theme">;

export const Home: React.FC<HomeProps> = ({ greeting }) => {
    const aboutRef = useRef<HTMLDivElement>(null);
    return (
        <Wrapper>
            <Intro greeting={greeting} aboutRef={aboutRef} />
            <About ref={aboutRef} />
            <Links />
            <Email />
            <Tip />
        </Wrapper>
    );
};
