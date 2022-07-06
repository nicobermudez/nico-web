import { Global, css } from "@emotion/react";

export const ResetStyles: React.FC = () => {
    return (
        <Global
            styles={css`
                /* Remove default margin */
                body,
                h1,
                h2,
                h3,
                h4,
                p,
                figure,
                blockquote,
                dl,
                dd {
                    margin: 0;
                }
                /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
                ul[role="list"],
                ol[role="list"] {
                    list-style: none;
                }
                /* Set core root defaults */
                html:focus-within {
                    scroll-behavior: smooth;
                }
                /* Set core body defaults */
                body {
                    min-height: 100vh;
                    text-rendering: optimizeSpeed;
                    line-height: 1.5;
                }
                /* Inherit fonts for inputs and buttons */
                input,
                button,
                textarea,
                select {
                    font: inherit;
                }
            `}
        />
    );
};
