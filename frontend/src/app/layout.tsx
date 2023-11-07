'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import '@styles/globals.scss';
import Script from 'next/script';
import { Metadata } from 'next';
import { Inter, Bebas_Neue, Zeyada } from '@next/font/google';
import Banner from '@components/CookieBanner/CookieBanner';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });
const zeyada = Zeyada({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-zeyada' });

export default function RootLayout({ children }: PropsWithChildren) {
    const [tastyplanCookiesAccepted, setTastyplanCookiesAccepted] = useState(false);
    useEffect(() => {
        function getCookieValue(cookieName: string): boolean {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name.trim() === cookieName) {
                    return Boolean(decodeURIComponent(value));
                }
            }
            return false;
        }

        const cookieValue = getCookieValue('tastyplan-cookiesAccepted');
        setTastyplanCookiesAccepted(cookieValue);
    }, []);

    return (
        <html lang="en">
            {process.env.NODE_ENV === 'production' && tastyplanCookiesAccepted && (
                <>
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script strategy="lazyOnload" id="tagmanager">
                        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
                    </Script>
                </>
            )}
            <body className={`${inter.variable} ${bebasNeue.variable} ${zeyada.variable}`}>
                <main
                    className="overflow-x-hidden"
                    style={{
                        backgroundColor: 'var(--white)',
                    }}
                >
                    {children}
                </main>
                <Banner setCookiesAccepted={setTastyplanCookiesAccepted} />
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'My Page Title',
    themeColor: '#D6E5E3',
    manifest: '/manifest.json',
    icons: {
        icon: [{ url: '/favicon.png' }, { url: '/favicon.svg' }],
        apple: { url: '/icon.png' },
    },
};
