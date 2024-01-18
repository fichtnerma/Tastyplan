'use client';
import { LogoLinkProvider } from '@contexts/LogoLinkContext';

type ContentProps = {
    children: React.ReactNode;
};

export default function Content({ children }: ContentProps) {
    return (
        <LogoLinkProvider>
            <main
                className="overflow-x-hidden"
                style={{
                    backgroundColor: 'var(--white)',
                }}
            >
                {children}
            </main>
        </LogoLinkProvider>
    );
}

