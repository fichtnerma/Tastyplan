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
                style={{
                    backgroundColor:
                        asPath == '/preferences' || asPath.includes('/intolerances')
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
