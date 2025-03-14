import '@styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter, Bebas_Neue, Zeyada } from '@next/font/google';
import { LogoLinkProvider } from '../contexts/LogoLinkContext';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });
const zeyada = Zeyada({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-zeyada' });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Tastyplan - Personalized Meal Planning</title>
            </Head>
            <LogoLinkProvider>
                <div className={`${inter.variable} ${bebasNeue.variable} ${zeyada.variable}`}>
                    <Component {...pageProps} />
                </div>
            </LogoLinkProvider>
        </>
    );
}
