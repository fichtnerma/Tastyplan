import { useSession } from 'next-auth/react';
import { Role } from 'src/types/types';

export const useAppUser = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const isUser = user?.role === Role.user;
    const hasFinishedSetup = status === 'authenticated' && user?.state === 'finished';
    return { isUser, hasFinishedSetup, user };
};
