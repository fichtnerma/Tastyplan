'use client';

import { useEffect, useState } from 'react';

let deferredPrompt: undefined | BeforeInstallPromptEvent = undefined;

export default function DownloadBtn() {
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        if (!('BeforeInstallPromptEvent' in window)) {
            setIsSupported(false);
            return;
        }

        window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
            deferredPrompt = e;
        });
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = undefined;
        }
    };

    return (
        <>
            {isSupported && (
                <button className="btn-primary" onClick={handleInstallClick}>
                    Install TastyPlan
                </button>
            )}
        </>
    );
}
