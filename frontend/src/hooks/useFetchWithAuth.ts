import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Weekplan } from "src/types/types";

const useFetchWithAuth = (url: string, options?: RequestInit) => {
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
            .then((data) => {
                setWeekplan({ ...data });
                setIsLoading(false);
            });
    }, [isLoading, session, url]);
    return { isLoading, data };
};