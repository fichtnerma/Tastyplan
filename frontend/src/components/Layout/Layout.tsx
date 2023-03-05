import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();
    return (
        <>
            {asPath !== '/startPage' && asPath !== '/preferences' && !asPath.includes('/intolerances') && <Header />}
            <main className="h-full flex justify-center items-center">{children}</main>
            <Footer />
        </>
    );
}
