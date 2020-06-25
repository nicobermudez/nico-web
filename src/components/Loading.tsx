import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import React from "react";
import { colors } from "../constants/colors";

const LoadingContainer = styled.div({
    backgroundColor: colors.themeDark,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const LoadingSpinnerContainer = styled.div({
    width: "100%",
    padding: "50px 0",
});

const LoadingSpinner = styled.svg({
    display: "block",
    margin: "0 auto",
    fill: colors.white,
});

const upAndDown = keyframes`
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    25% {
      opacity: 1;
      transform: translateY(-10px);
    }
    75% {
      opacity: 1;
      transform: translateY(-10px);
    }
    100% {
      opacity: 0;
      transform: translateY(0);
    }
`;

const Circle = styled.circle({
    animationName: upAndDown,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.05, 0.2, 0.35, 1)",
    animationIterationCount: "infinite",
    "&:nth-of-type(2)": {
        animationDelay: "0.18s",
    },
    "&:nth-of-type(3)": {
        animationDelay: "0.36s",
    },
});

export const Loading: React.FC = () => {
    return (
        <LoadingContainer>
            <LoadingSpinnerContainer>
                <LoadingSpinner
                    width="60"
                    height="20"
                    viewBox="0 0 60 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Circle cx="7" cy="15" r="4" />
                    <Circle cx="30" cy="15" r="4" />
                    <Circle cx="53" cy="15" r="4" />
                </LoadingSpinner>
            </LoadingSpinnerContainer>
        </LoadingContainer>
    );
};
