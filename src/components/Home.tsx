import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { Intro } from "./Intro";
import { Scroll } from "./Scroll";

const HomeContainer = styled.div({
    backgroundColor: "#16181d",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "sans-serif",
});

export const Home: React.FC = () => {
    const [enter, setEnter] = useState(false);
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
                : <div>
                    <Intro />
                    <Scroll />
                </div>
            }
        </HomeContainer>
    );
};
