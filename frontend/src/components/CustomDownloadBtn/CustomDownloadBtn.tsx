'use client';

import { useEffect } from 'react';

let deferredPrompt: undefined | BeforeInstallPromptEvent = undefined;

export default function DownloadBtn() {
    useEffect(() => {
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
            <button onClick={handleInstallClick}>Install TastyPlan</button>
        </>
    );
}
