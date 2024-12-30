import { ResetStyles } from "@app/components/ResetStyles";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Analytics } from "@vercel/analytics/next";

const _App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Nico Bermudez</title>
            </Head>
            <Analytics />
            <Component {...pageProps} />
            <ResetStyles />
        </>
    );
};

export default _App;
