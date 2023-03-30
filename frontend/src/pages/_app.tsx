import Layout from '@components/Layout/Layout';

import '@styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/App.module.scss';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <div className={styles.background}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </SessionProvider>
    );
}
