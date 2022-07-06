import styled from "@emotion/styled";
import { darken } from "polished";

export const Button = styled.button(
    {
        gridArea: "button",
        appearance: "none",
        border: "none",
        borderRadius: 20,
        font: "inherit",
        fontSize: 16,
        cursor: "pointer",
        height: 38,
        padding: "0 24px",
        flexShrink: 0,
        "&:disabled": {
            cursor: "not-allowed",
        },
        "&:focus": {
            outline: "none",
            boxShadow:
                "inset 0 0 0 0 rgba(25, 25, 25, 0.4), 0 2px 8px rgb(255, 255, 255, 0.2), 0 0 0 0.25em rgb(255, 255, 255, 0.3)",
        },
    },
    ({ theme }) => ({
        backgroundColor: theme.palette.typography.contrast,
        color: theme.palette.typography.main,
        "&:hover": {
            backgroundColor: darken(0.05, theme.palette.typography.contrast),
        },
    }),
);
