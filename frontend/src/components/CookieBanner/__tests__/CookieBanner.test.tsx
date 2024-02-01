import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import CookieBanner from '../CookieBanner';

describe('CookieBanner', () => {
    const mockSetCookiesAccepted = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        }
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<CookieBanner setCookiesAccepted={mockSetCookiesAccepted} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders CookieBanner component', () => {
        const { getByText, getByRole, getByAltText } = render(
            <CookieBanner setCookiesAccepted={mockSetCookiesAccepted} />,
        );

        expect(getByText('We use cookies')).toBeInTheDocument();
        expect(
            getByText(
                'We use tracking cookies to understand how you use the product and help us improve it. Please accept cookies to help us improve.',
            ),
        ).toBeInTheDocument();
        expect(getByRole('button', { name: 'Accept cookies' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Decline cookies' })).toBeInTheDocument();
        expect(getByAltText('icon')).toBeInTheDocument();
    });

    it('should call setCookiesAccepted with true when accept cookies button is clicked', () => {
        const { getByRole } = render(<CookieBanner setCookiesAccepted={mockSetCookiesAccepted} />);

        getByRole('button', { name: 'Accept cookies' }).click();

        expect(mockSetCookiesAccepted).toHaveBeenCalledWith(true);
    });

    it('should call setCookiesAccepted with false when decline cookies button is clicked', () => {
        const { getByRole } = render(<CookieBanner setCookiesAccepted={mockSetCookiesAccepted} />);
        getByRole('button', { name: 'Decline cookies' }).click();

        expect(mockSetCookiesAccepted).toHaveBeenCalledWith(false);
    });
});
