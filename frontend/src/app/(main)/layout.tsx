'use client';
import { PropsWithChildren } from 'react';
import SessionProviderWrapper from '@components/SessionProviderWrapper/SessionProviderWrapper';
import SecondHeader from '@components/Layout/Header/SecondHeader/SecondHeader';
import Header from '@components/Layout/Header/MainHeader';

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <SecondHeader waveForm="lite" />
            <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </>
    );
}
