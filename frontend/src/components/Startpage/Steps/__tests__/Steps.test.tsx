import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Steps from '../Steps';

describe('Steps', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<Steps />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders the Steps component with correct content', () => {
        const { getByText, getAllByText } = render(<Steps />);

        // You can add more specific assertions based on your component content
        expect(
            getByText(
                'Set up your account by entering your dietary preferences, food allergies, and schedule. This will help Tastyplan generate a personalized meal plan for you.',
            ),
        ).toBeInTheDocument();
        expect(
            getByText('Tastyplan will generate a weekly meal plan for you, complete with recipes and a shopping list.'),
        ).toBeInTheDocument();
        expect(
            getByText(
                'Review your meal plan and make any necessary adjustments. You can swap out recipes, add or remove meals, and adjust portions as needed.',
            ),
        ).toBeInTheDocument();
        expect(
            getByText(
                'Print or save your shopping list and head to the grocery store to get everything you need for the week.',
            ),
        ).toBeInTheDocument();
    });
    it('renders the correct number of steps', () => {
        const { getAllByText } = render(<Steps />);

        expect(getAllByText('step')).toHaveLength(4);
    });
    it('renders images when image source is provided', () => {
        const { getAllByRole } = render(<Steps />);

        // Make sure images are rendered for steps where image source is provided
        const images = getAllByRole('img');
        expect(images).toHaveLength(4);
    });
});
