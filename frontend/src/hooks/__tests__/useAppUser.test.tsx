import { useSession } from 'next-auth/react';
import { renderHook } from '@testing-library/react';
import { useAppUser } from '../useAppUser';

enum Role {
    user = 'user',
    admin = 'admin',
    guest = 'guest',
}

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('useAppUser', () => {
    it('returns correct values when user is authenticated, is a user, and has finished setup', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    role: Role.user,
                    state: 'finished',
                },
            },
            status: 'authenticated',
        });

        const { result } = renderHook(() => useAppUser());

        expect(result.current.isUser).toBe(true);
        expect(result.current.hasFinishedSetup).toBe(true);
        expect(result.current.isLoggedIn).toBe(true);
    });

    it('returns correct values when user is authenticated, is not a user, and has not finished setup', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    role: Role.admin,
                    state: 'pending',
                },
            },
            status: 'authenticated',
        });

        const { result } = renderHook(() => useAppUser());

        expect(result.current.isUser).toBe(false);
        expect(result.current.hasFinishedSetup).toBe(false);
        expect(result.current.isLoggedIn).toBe(true);
    });

    it('returns correct values when user is not authenticated', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });

        const { result } = renderHook(() => useAppUser());

        expect(result.current.isUser).toBe(false);
        expect(result.current.hasFinishedSetup).toBe(false);
        expect(result.current.isLoggedIn).toBe(false);
    });
});
