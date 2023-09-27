import { PropsWithChildren } from 'react';
import SecondHeader from '@components/Layout/Header/SecondHeader/SecondHeader';

export default function LiteWaveLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SecondHeader waveForm="lite" />
            {children}
        </>
    );
}
