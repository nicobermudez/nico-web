import { ResetStyles } from "@app/components/ResetStyles";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

const _App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Nico Bermudez</title>
            </Head>
            <Component {...pageProps} />
            <ResetStyles />
        </>
    );
};

export default _App;
