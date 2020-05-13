export type ThemeBreakpoints = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};

export type ThemeBreakpointNumbers = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
export const breakpointNumbers = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1232,
};
export const breakpoints: ThemeBreakpoints = {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1232px",
};

export const mediaQueries: ThemeBreakpoints = {
    xs: `@media (min-width: ${breakpoints.xs})`,
    sm: `@media (min-width: ${breakpoints.sm})`,
    md: `@media (min-width: ${breakpoints.md})`,
    lg: `@media (min-width: ${breakpoints.lg})`,
    xl: `@media (min-width: ${breakpoints.xl})`,
};