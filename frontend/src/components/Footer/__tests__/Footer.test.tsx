jest.mock('next/image', () => ({
    __esModule: true,
    // Use a dummy component instead of the real one
    default: () => {
        return 'img';
    },
}));

import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Footer />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders Footer component', () => {
        const { getByText } = render(<Footer />);

        expect(getByText('HELP')).toBeInTheDocument();
        expect(getByText('Q&A')).toBeInTheDocument();
        expect(getByText('Company')).toBeInTheDocument();
        expect(getByText('About us')).toBeInTheDocument();
        expect(getByText('Legal')).toBeInTheDocument();
        expect(getByText('Privacy Policy')).toBeInTheDocument();
        expect(getByText('Imprint')).toBeInTheDocument();
        expect(getByText('img')).toBeInTheDocument();
    });
});
