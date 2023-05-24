import { useSession } from 'next-auth/react';
import { Role } from 'src/types/types';

export const useAppUser = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const isUser = user?.role === Role.user;
    return { isUser, user };
};
