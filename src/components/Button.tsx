import styled from "@emotion/styled";
import darken from "polished/lib/color/darken";
import { colors } from "src/constants/colors";

export const Button = styled.button({
    backgroundColor: colors.themeLight,
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
    "&:active": {
        borderColor: darken(0.1, colors.themeLight),
        backgroundColor: darken(0.1, colors.themeLight),
    },
    "&:hover": {
        backgroundColor: darken(0.05, colors.themeLight),
    },
    "&:focus": {
        outline: "none",
        boxShadow:
            "inset 0 0 0 0 rgba(25, 25, 25, 0.4), 0 2px 8px rgb(255, 255, 255, 0.2), 0 0 0 0.25em rgb(255, 255, 255, 0.3)",
    },
});
