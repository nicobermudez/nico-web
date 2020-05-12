import styled from "@emotion/styled";
import React, { useState } from "react";
import { Enter } from "./Enter";
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

    return (
        <HomeContainer>
            {enter 
                ? <div>
                    <Intro />
                    <Scroll />
                </div>
                : <Enter enter={enter} setEnter={setEnter} />
            }
        </HomeContainer>
    );
};
