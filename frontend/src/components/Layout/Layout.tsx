import React from 'react';
import { useRouter } from 'next/router';
import Header from '@components/Layout/Header/MainHeader';
import Footer from '@components/Footer/Footer';
import SecondHeader from './Header/SecondHeader/SecondHeader';

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();

    const includesMainHeader = () => {
        return (
            asPath !== '/' &&
            !asPath.includes('/authentication') &&
            !asPath.includes('/preferences') &&
            !asPath.includes('/setup') &&
            !asPath.includes('/intolerances')
        );
    };

    const includesLiteHeader = () => {
        //<MobileHeader /> <DesktopHeader />
        return (
            asPath.includes('/authentication') ||
            asPath.includes('/preferences') ||
            asPath.includes('/setup') ||
            asPath.includes('/intolerances') ||
            asPath.includes('/weekOverview') ||
            asPath.includes('/recipe')
        );
    };

    const getWaveForm = () => {
        if (asPath.includes('/weekOverview') || asPath.includes('/recipe')) return 'lite';
        else return 'strong';
    };

    return (
        <>
            {/* {includesMainHeader() && <Header />} */}
            {includesLiteHeader() && <SecondHeader waveForm={getWaveForm()} />}
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
