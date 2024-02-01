import { SessionProvider, useSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import SomeFavorites from '../SomeFavorites';
const useFetchAuth: typeof useSession = jest.fn().mockReturnValue({});
fetchMock.enableMocks();

const useFavorites = jest.fn().mockReturnValue({});
describe('SomeFavorites', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(
            <SessionProvider>
                <SomeFavorites useFetchAuth={useFetchAuth} useFavorites={useFavorites} />
            </SessionProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
    it('renders component', () => {
        const { getByText } = render(
            <SessionProvider>
                <SomeFavorites useFetchAuth={useFetchAuth} useFavorites={useFavorites} />
            </SessionProvider>,
        );

        expect(getByText('Some of your all-Time-Favorites')).toBeInTheDocument();
    });
});
