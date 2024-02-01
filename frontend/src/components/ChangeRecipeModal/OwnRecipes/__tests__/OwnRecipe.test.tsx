import { SessionProvider, useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import OwnRecipes from '../OwnRecipes';

const useAuthSession: typeof useSession = jest.fn().mockReturnValue({
    data: {
        user: {
            token: {
                Authorization:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDY3OTQ0ODksImV4cCI6MTcxMTk3ODQ4OX0.KlKpYJOR189c46UNfRyeYQ7H8D4EUoZcMLqPa-Iz26A',
            },
            id: 'e95720ca-9555-4d97-bc19-a5e75085a823',
            userId: 'email@email.com',
            role: 'user',
            state: 'registration',
            createdAt: '2024-02-01T13:34:45.564Z',
            updatedAt: '2024-02-01T13:34:45.564Z',
        },
    },
    error: undefined,
    refresh: jest.fn(),
});
fetchMock.enableMocks();
describe('OwnRecipes', () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <SessionProvider>
                <OwnRecipes useAuthSession={useAuthSession} />
            </SessionProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
