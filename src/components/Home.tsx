import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { About } from "./About";
import { Email } from "./Email";
import { Links } from "./Links";
import { Intro } from "./Intro";
import { Tip } from "./Tip";
import { Loading } from "./Loading";

const Wrapper = styled.div({
    fontFamily: "sans-serif",
    position: "relative",
});

export const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Wrapper>
                <Intro />
                <About />
                <Links />
                <Email />
                <Tip />
            </Wrapper>
        </>
    );
};
