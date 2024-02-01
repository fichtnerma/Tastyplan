import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Menu from '../Menu';

describe('Menu', () => {
    const toggleMenu = jest.fn();
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Menu toggleMenu={toggleMenu} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText, getByRole } = render(<Menu toggleMenu={toggleMenu} />);

        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Tasty Plan App')).toBeInTheDocument();
        expect(getByText('Contact')).toBeInTheDocument();
        expect(getByText('Q&A')).toBeInTheDocument();
        expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/weekOverview');
        expect(getByRole('link', { name: 'Tasty Plan App' })).toHaveAttribute('href', '/weekOverview');
        expect(getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/weekOverview');
        expect(getByRole('link', { name: 'Q&A' })).toHaveAttribute('href', '/weekOverview');
    });
});
