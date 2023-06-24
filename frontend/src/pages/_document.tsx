import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#D6E5E3" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
