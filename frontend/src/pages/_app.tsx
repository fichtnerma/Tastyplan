import Layout from '@components/Layout/Layout';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <div className='bg-[url("../../public/startBackground.jpg")]'>
                <Component {...pageProps} />
            </div>
        </Layout>
    );
}
