import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render, waitFor } from '@testing-library/react';
import CookieWrapper from '../CookieWrapper';

fetchMock.enableMocks();
describe('CookieWrapper', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        window.gtag = jest.fn();
        window.dataLayer = [];
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<CookieWrapper />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders CookieWrapper component', () => {
        const { getByText } = render(<CookieWrapper />);

        expect(getByText('We use cookies')).toBeInTheDocument();
        expect(
            getByText(
                'We use tracking cookies to understand how you use the product and help us improve it. Please accept cookies to help us improve.',
            ),
        ).toBeInTheDocument();
        expect(getByText('Accept cookies')).toBeInTheDocument();
        expect(getByText('Decline cookies')).toBeInTheDocument();
    });

    it('accepts cookies and loads Google Analytics scripts', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));

        const { getByRole } = render(<CookieWrapper />);

        getByRole('button', { name: 'Accept cookies' }).click();

        await waitFor(() => {
            expect(window.gtag).toBeDefined();
            expect(window.dataLayer).toBeDefined();
        });
    });
});
