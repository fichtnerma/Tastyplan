import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();
    return (
        <>
            {asPath !== '/startPage' &&
                asPath !== '/registration' &&
                asPath !== '/login' &&
                asPath !== '/preferences' &&
                !asPath.includes('/intolerances') && <Header />}
            <main>{children}</main>
            <Footer />
        </>
    );
}
