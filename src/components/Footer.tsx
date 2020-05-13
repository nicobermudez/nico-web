import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled.div({
    position: "fixed",
    top: 64,
    left: 64,
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    textTransform: "uppercase",
    fontFamily: "sans-serif",
});

const Link = styled.a({
    marginRight: 16,
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
});

export const Footer: React.FC = () => (
    <FooterContainer>
        <Link target="_blank" href="https://github.com/nicobermudez">Git</Link>
        <Link target="_blank" href="https://www.linkedin.com/in/nicolasbermudezco/">CV</Link>
    </FooterContainer>
);
