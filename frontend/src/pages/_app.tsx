import '@styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter, Bebas_Neue, Zeyada } from '@next/font/google';
import MobileHeader from '@components/Layout/MobileHeader';
import Layout from '@components/Layout/Layout';
import DesktopHeader from '@components/Layout/DesktopHeader';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });
const zeyada = Zeyada({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-zeyada' });

export default function App({ Component, pageProps }: AppProps) {
    const { asPath } = useRouter();

    const showHeaders = () => {
        return asPath.includes('/setup') || asPath.includes('/authentication');
    };

    return (
        <SessionProvider session={pageProps.session}>
            <div className={`${inter.variable} ${bebasNeue.variable} ${zeyada.variable}`}>
                <Layout>
                    {showHeaders() && (
                        <>
                            <MobileHeader />
                            <DesktopHeader />
                        </>
                    )}

                    <Component {...pageProps} />
                </Layout>
            </div>
        </SessionProvider>
    );
}
