'use client';
import { useEffect, useState } from 'react';
import '@styles/globals.scss';
import Script from 'next/script';
import fetchMock from 'jest-fetch-mock';
import Banner from './CookieBanner';

fetchMock.enableMocks();

export default function CookieWrapper() {
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
        <>
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
            <Banner setCookiesAccepted={setTastyplanCookiesAccepted} />
        </>
    );
}
