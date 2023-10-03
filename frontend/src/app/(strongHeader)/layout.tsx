'use client';
import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import SessionProviderWrapper from '@components/SessionProviderWrapper/SessionProviderWrapper';
import SecondHeader from '@components/Layout/Header/SecondHeader/SecondHeader';

export default function StrongWaveLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SecondHeader waveForm="strong" />
            <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </>
    );
}
