import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import AddRecipeCard from '../AddRecipeCard';

describe('AddRecipeCard', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<AddRecipeCard />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText, getByRole } = render(<AddRecipeCard />);

        expect(getByText('add your')).toBeInTheDocument();
        expect(getByText('own recipe')).toBeInTheDocument();
        expect(getByRole('link', { name: 'add your own recipe' })).toHaveAttribute('href', '/addRecipe');
    });
});
