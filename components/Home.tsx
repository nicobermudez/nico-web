import { About } from "./About";
import { Email } from "./Email";
import { Links } from "./Links";
import { Intro } from "./Intro";
import { Tip } from "./Tip";
import styled from "@emotion/styled";

export const Home: React.FC = () => (
    <>
        <Intro />
        <About />
        <Links />
        <Email />
        <Tip />
    </>
);
