import { PropsWithChildren } from 'react';
import '@styles/globals.scss';
import { Metadata } from 'next';
import { Inter, Bebas_Neue, Zeyada } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });
const zeyada = Zeyada({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-zeyada' });

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
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
    title: 'TastyPlan',
    themeColor: '#D6E5E3',
    manifest: '/manifest.json',
    icons: {
        icon: [{ url: '/favicon.png' }, { url: '/favicon.svg' }],
        apple: { url: '/icon.png' },
    },
};
