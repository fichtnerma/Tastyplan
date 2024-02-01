import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Collections from '../Collections';

describe('Collections', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Collections />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText, getByRole, queryAllByAltText } = render(<Collections />);

        expect(getByText('Your collections')).toBeInTheDocument();
        expect(getByText('Your Recipes')).toBeInTheDocument();
        expect(getByText('Your Favorites')).toBeInTheDocument();
        expect(queryAllByAltText('Food Img')).toHaveLength(2);
        expect(getByRole('link', { name: 'Food Img Your Recipes' })).toHaveAttribute('href', '/cookbook/ownRecipes');
        expect(getByRole('link', { name: 'Food Img Your Favorites' })).toHaveAttribute('href', '/cookbook/favorites');
    });
});
