import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Benefits from '../Benefits';

describe('Benefits', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Benefits />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText } = render(<Benefits />);

        expect(getByText('Saves time and money')).toBeInTheDocument();
        expect(getByText('by allowing for efficient grocery shopping and reducing food waste.')).toBeInTheDocument();
        expect(getByText('Promotes healthier eating habits')).toBeInTheDocument();
        expect(
            getByText(
                'by encouraging the consumption of a balanced and varied diet that meets nutritional needs and supports overall health.',
            ),
        ).toBeInTheDocument();
        expect(getByText('Reduces food waste')).toBeInTheDocument();
        expect(
            getByText('by helping you purchase only the necessary ingredients and use up items before they expire.'),
        ).toBeInTheDocument();
        expect(getByText('Reduces stress and decisions')).toBeInTheDocument();
        expect(
            getByText(
                'by eliminating the need to constantly think about what to eat and simplifying mealtime preparation.',
            ),
        ).toBeInTheDocument();
    });
});
