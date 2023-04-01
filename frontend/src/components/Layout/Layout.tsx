import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

import { Inter, Bebas_Neue } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], style: ['normal'], weight: ['200', '400', '700'] });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], style: 'normal', weight: '400' });

console.log(inter, bebasNeue);

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();

    return (
        <>
            {asPath !== '/' &&
                !asPath.includes('/authentication') &&
                !asPath.includes('/preferences') &&
                !asPath.includes('/setup') &&
                !asPath.includes('/intolerances') && <Header />}
            <main
                className={styles.mainContainer}
                style={{
                    backgroundColor:
                        asPath == '/' ||
                        asPath == '/authentication/registration' ||
                        asPath == '/authentication/login' ||
                        asPath == '/preferences' ||
                        asPath.includes('/intolerances') ||
                        asPath.includes('/setup')
                            ? 'var(--green-light)'
                            : 'var(--white)',
                }}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}
