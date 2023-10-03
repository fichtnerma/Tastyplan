import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import StoreInitializer from './StoreInitializer';

function SessionProviderWrapper({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            <StoreInitializer />
            {children}
        </SessionProvider>
    );
}

export default SessionProviderWrapper;
