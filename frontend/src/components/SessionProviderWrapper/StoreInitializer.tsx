import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useFavoriteStore } from '@hooks/useFavorites';

function StoreInitializer() {
    const { data: session } = useSession();
    const { fetch } = useFavoriteStore();

    useEffect(() => {
        if (!session) return;

        fetch(session);
    }, [session, fetch]);

    return <></>;
}

export default StoreInitializer;
