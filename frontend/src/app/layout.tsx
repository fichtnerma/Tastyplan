import { PropsWithChildren } from 'react';
import '@styles/globals.scss';
import Script from 'next/script';
import { Metadata } from 'next';
import { Inter, Bebas_Neue, Zeyada } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });
const zeyada = Zeyada({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-zeyada' });

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            {process.env.NODE_ENV === 'production' && (
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
