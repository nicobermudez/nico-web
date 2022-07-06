import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        darkMode: boolean;
        palette: {
            typography: {
                main: string;
                secondary: string;
                contrast: string;
            };
            surfaces: {
                default: string;
                secondary: string;
            };
        };
    }
}
