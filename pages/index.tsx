import { Home } from "@app/components";
import { NextQuery } from "@app/middleware";
import { darkMode, lightMode } from "@app/theme";
import { ThemeProvider } from "@emotion/react";

export const getServerSideProps = ({ query }: { query: NextQuery }) => ({
    props: query,
});

export default function Index({ theme, ...props }: NextQuery) {
    return (
        <ThemeProvider theme={theme === "dark" ? darkMode : lightMode}>
            <Home {...props} />
        </ThemeProvider>
    );
}
