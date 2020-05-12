import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Intro } from "./Intro";
import { Scroll } from "./Scroll";

const HomeContainer = styled.div({
    backgroundColor: "#16181d",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
        <HomeContainer>
            {loading 
                ? <Loading />
                : <>
                    <Intro />
                    <Scroll />
                </>
            }
        </HomeContainer>
    );
};
