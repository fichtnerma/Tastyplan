'use client';
import { PropsWithChildren } from 'react';
import SessionProviderWrapper from '@components/SessionProviderWrapper/SessionProviderWrapper';
import SecondHeader from '@components/Layout/Header/SecondHeader/SecondHeader';
import Header from '@components/Layout/Header/MainHeader';
import Footer from '@components/Footer/Footer';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SecondHeader waveForm="lite" />
            <SessionProviderWrapper>
                <Header />
                {children}
            </SessionProviderWrapper>
            <Footer />
        </>
    );
}
