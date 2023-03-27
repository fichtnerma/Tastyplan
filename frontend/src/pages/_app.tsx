import Layout from '@components/Layout/Layout';

import '@styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/App.module.scss';

import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={styles.background}>
            <div className={styles.greenShadow}>
                <Layout>
                    {' '}
                    <Component {...pageProps} /> <ToastContainer />
                </Layout>
            </div>
        </div>
    );
}
