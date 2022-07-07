import { ResetStyles } from "@app/components/ResetStyles";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC, useEffect } from "react";
import GoogleTagManager from "react-gtm-module";

const _App: FC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_GTM_ID) {
            GoogleTagManager.initialize({
                gtmId: process.env.NEXT_PUBLIC_GTM_ID,
            });
        }
    }, []);
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
