import { colors } from "@app/theme";
import Document, { Html, Head, Main, NextScript } from "next/document";

class _Document extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content={colors.themeDark} />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default _Document;
