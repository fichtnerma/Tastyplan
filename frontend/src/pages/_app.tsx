import Layout from '@components/Layout/Layout';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import styles from '../styles/App.module.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <div className={styles.background}>
                <div className={styles.greenShadow}>
                    <Component {...pageProps} />
                </div>
            </div>
        </Layout>
    );
}
