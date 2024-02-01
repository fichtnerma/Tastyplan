import { useSession } from 'next-auth/react';
import { Role } from './../types/types';

export const useAppUser = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const isUser = user?.role === Role.user;
    const hasFinishedSetup = status === 'authenticated' && user?.state === 'finished';

    const isLoggedIn = status === 'authenticated';
    return { isUser, hasFinishedSetup, isLoggedIn };
};
