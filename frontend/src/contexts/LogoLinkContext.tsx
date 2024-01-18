import React, { createContext, useContext, ReactNode } from 'react';

interface LogoLinkContextProps {
    children: ReactNode;
}

interface LogoLinkContextValue {
    logoLinkTarget: string;
    setLogoLinkTarget: (newTarget: string) => void;
}

const LogoLinkContext = createContext<LogoLinkContextValue | undefined>(undefined);

export const LogoLinkProvider: React.FC<LogoLinkContextProps> = ({ children }) => {
    const [logoLinkTarget, setLogoLinkTarget] = React.useState<string>('/');

    return (
        <LogoLinkContext.Provider value={{ logoLinkTarget: logoLinkTarget, setLogoLinkTarget: setLogoLinkTarget }}>
            {children}
        </LogoLinkContext.Provider>
    );
};

export const useLogoLinkData = (): LogoLinkContextValue => {
    const context = useContext(LogoLinkContext);
    if (!context) {
        throw new Error('useLogoLinkData must be used within a LogoLinkProvider');
    }
    return context;
};
