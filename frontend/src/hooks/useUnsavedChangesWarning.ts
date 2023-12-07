import { useEffect } from 'react';

export default function useUnsavedChangesWarning(condition: boolean) {
    useEffect(() => {
        const beforeunloadHandler = (e: BeforeUnloadEvent) => {
            if (condition) {
                const message = 'You have unsaved changes. Are you sure you want to leave?';
                e.returnValue = message;
                return message;
            }
        };
        window.addEventListener('beforeunload', beforeunloadHandler);
        return () => {
            window.removeEventListener('beforeunload', beforeunloadHandler);
        };
    }, [condition]);
}
