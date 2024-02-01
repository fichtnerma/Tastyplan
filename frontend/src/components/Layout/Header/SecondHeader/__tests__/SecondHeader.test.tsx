import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import SecondHeader from '../SecondHeader';
import { LogoLinkProvider } from '../../../../../contexts/LogoLinkContext';
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        return <img {...props} />;
    },
}));
describe('SecondHeader', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <LogoLinkProvider>
                <SecondHeader waveForm="strong" />
            </LogoLinkProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <LogoLinkProvider>
                <SecondHeader waveForm="lite" />
            </LogoLinkProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component with strong waveForm', () => {
        const { getByRole, getByAltText } = render(
            <LogoLinkProvider>
                <SecondHeader waveForm="strong" />
            </LogoLinkProvider>,
        );

        expect(getByRole('link', { name: 'logo' })).toHaveAttribute('href', '/');
        expect(getByAltText('logo')).toBeInTheDocument();
    });
});
