// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export const useFetchWithAuth = (url: string, options: RequestInit = { method: 'GET' }): [boolean, unknown] => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState<unknown>();
//     const { data: session } = useSession();
//     console.log(isLoading);
//     useEffect(() => {
//         if (!session) return;
//         fetch(url, {
//             ...options,
//             headers: {
//                 ...options?.headers,
//                 Authorization: `Bearer ${session?.user.token.Authorization}`,
//             },
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//             })
//             .then((loadedData) => {
//                 setData(loadedData);
//                 setIsLoading(false);
//             });
//     }, [isLoading, data]);
//     return [isLoading, data];
// };

import { useEffect, useReducer, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

interface State<T> {
    data?: T;
    error?: Error;
}

type ReturnType<T> = {
    data?: T;
    error?: Error;
    refresh: () => void;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> = { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error };

function useFetchWithAuth<T = unknown>(url?: string, options?: RequestInit): ReturnType<T> {
    const cache = useRef<Cache<T | null>>({});
    const [shouldRefresh, setShouldRefresh] = useState(false);
    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    };

    const refresh = () => {
        if (url) cache.current[url] = null
        setShouldRefresh((shouldRefresh) => !shouldRefresh );
    }

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState };
            case 'fetched':
                return { ...initialState, data: action.payload };
            case 'error':
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const { data: session } = useSession();

    useEffect(() => {
        
        // Do nothing if the url is not given
        if (!url) return;
        
        if (!session) return;
        cancelRequest.current = false;

        const fetchData = async () => {
            dispatch({ type: 'loading' });

            // If a cache exists for this url, return it
            if (cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] });
                return;
            }
            
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: { ...options?.headers, Authorization: `Bearer ${session?.user.token.Authorization}` },
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = (await response.json()) as T;
                cache.current[url] = data;
                if (cancelRequest.current) return;

                dispatch({ type: 'fetched', payload: data });
            } catch (error) {
                if (cancelRequest.current) return;

                dispatch({ type: 'error', payload: error as Error });
            }
        };

        void fetchData();

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, session, shouldRefresh]);

    return {data: state.data, error: state.error, refresh};
}

export default useFetchWithAuth;
