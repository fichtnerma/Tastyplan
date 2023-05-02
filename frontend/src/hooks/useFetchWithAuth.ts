import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useFetchWithAuth = (url: string, options: RequestInit = { method: 'GET' }): [boolean, unknown] => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<unknown>();
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) return;
        fetch(url, {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: `Bearer ${session?.user.token.Authorization}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((loadedData) => {
                setIsLoading(false);
                setData(loadedData);
            });
    }, [isLoading, options, session, url]);
    return [isLoading, data];
};
