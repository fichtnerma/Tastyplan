import { PropsWithChildren } from 'react';
import SecondHeader from '@components/Layout/Header/SecondHeader/SecondHeader';
import Footer from '@components/Footer/Footer';

export default function LiteWaveLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SecondHeader waveForm="lite" />
            {children}
            <Footer />
        </>
    );
}
