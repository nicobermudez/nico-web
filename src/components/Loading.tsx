import styled from "@emotion/styled";
import React from "react";
import { colors } from "../constants/colors";
import "./loading.scss";

const LoadingContainer = styled.div({
    backgroundColor: colors.themeDark,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

export const Loading: React.FC = () => {
    return (
        <LoadingContainer>
            <div className="loading_spinner-wrap">
                <svg
                    className="loading_spinner"
                    width="60"
                    height="20"
                    viewBox="0 0 60 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="7" cy="15" r="4" />
                    <circle cx="30" cy="15" r="4" />
                    <circle cx="53" cy="15" r="4" />
                </svg>
            </div>
        </LoadingContainer>
    );
};
