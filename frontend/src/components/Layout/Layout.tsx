import React from 'react';
import { useRouter } from 'next/router';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

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
                className="min-h-screen flex lg:p-14"
                style={{
                    backgroundColor:
                        asPath == '/authentication/registration' ||
                        asPath == '/authentication/login' ||
                        asPath == '/preferences' ||
                        asPath.includes('/intolerances') ||
                        asPath.includes('/setup')
                            ? 'var(--green-light)'
                            : 'var(--white)',
                    paddingTop:
                        asPath == '/' ||
                        asPath == '/authentication/registration' ||
                        asPath == '/authentication/login' ||
                        asPath == '/preferences' ||
                        asPath.includes('/intolerances') ||
                        asPath.includes('/setup')
                            ? '2rem'
                            : '7rem',
                }}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}
