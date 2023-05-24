import { useSession } from 'next-auth/react';

export const usePermissionCheck = () => {
    const { data: session, status } = useSession();
    const hasAccess = status === 'authenticated' && session?.user?.role === 'admin';
    return { hasAccess };
};
