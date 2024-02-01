import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { LogoLinkProvider } from '@contexts/LogoLinkContext';
import SetupPage from '../page';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('SetupPage', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(
            <LogoLinkProvider>
                <SetupPage />
            </LogoLinkProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
