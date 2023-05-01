import '@styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter, Bebas_Neue } from '@next/font/google';
import Layout from '@components/Layout/Layout';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400', variable: '--font-bebas' });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <div className={`${inter.variable} ${bebasNeue.variable}`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </SessionProvider>
    );
}
