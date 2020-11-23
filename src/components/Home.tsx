import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { About } from "./About";
import { Email } from "./Email";
import { Links } from "./Links";
import { Intro } from "./Intro";

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


    return (
        <>
            {loading
                ? <Loading />
                : <Wrapper>
                    <Intro />
                    <About />
                    <Links />
                    <Email />
                </Wrapper>
            }
        </>
    );
};
