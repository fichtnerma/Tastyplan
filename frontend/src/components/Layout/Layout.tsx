import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '@components/Layout/Header/MainHeader';
import Footer from '@components/Footer/Footer';
import SecondHeader from './Header/SecondHeader/SecondHeader';

export default function Layout({ children }: React.PropsWithChildren) {
    const { asPath } = useRouter();
    const { data: session } = useSession();

    const includesMainHeader = () => {
        return (
            asPath !== '/' &&
            !asPath.includes('/authentication') &&
            !asPath.includes('/preferences') &&
            !asPath.includes('/setup') &&
            !asPath.includes('/intolerances') &&
            session !== null
        );
    };

    const includesLiteHeader = () => {
        return (
            asPath.includes('/authentication') ||
            asPath.includes('/preferences') ||
            asPath.includes('/setup') ||
            asPath.includes('/intolerances') ||
            asPath.includes('/weekOverview') ||
            asPath.includes('/shoppingList') ||
            asPath.includes('/recipe') ||
            asPath.includes('/legal') ||
            asPath.includes('/help') ||
            asPath.includes('/company') ||
            asPath.includes('/settings')
        );
    };

    const getWaveForm = () => {
        if (
            asPath.includes('/weekOverview') ||
            asPath.includes('/recipe') ||
            asPath.includes('/shoppingList') ||
            asPath.includes('/legal') ||
            asPath.includes('/help') ||
            asPath.includes('/company') ||
            asPath.includes('/settings')
        )
            return 'lite';
        else return 'strong';
    };

    return (
        <>
            {includesMainHeader() && <Header />}
            {includesLiteHeader() && <SecondHeader waveForm={getWaveForm()} />}
            <main
                className="overflow-x-hidden"
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
