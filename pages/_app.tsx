import { ResetStyles } from "@app/components/ResetStyles";
import { colors } from "@app/theme";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

const _App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Nico Bermudez</title>
            </Head>
            <div
                css={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "min-content 1fr min-content",
                    minHeight: "100vh",
                    backgroundColor: colors.themeDark,
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                <Component {...pageProps} />
                <ResetStyles />
            </div>
        </>
    );
};

export default _App;
