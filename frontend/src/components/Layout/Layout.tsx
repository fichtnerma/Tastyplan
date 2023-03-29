import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();
    return (
        <>
            {asPath !== '/' &&
                asPath !== '/authentication/registration' &&
                asPath !== '/authentication/login' &&
                asPath !== '/preferences' &&
                !asPath.includes('/intolerances') && <Header />}
            <main className={styles.mainContainer}
                style={{
                    backgroundColor: (asPath == '/' ||
                        asPath == '/authentication/registration' ||
                        asPath == '/authentication/login' ||
                        asPath == '/preferences' ||
                        asPath.includes('/intolerances')) ? 'var(--green-light)' : 'var(--white)'
                }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
