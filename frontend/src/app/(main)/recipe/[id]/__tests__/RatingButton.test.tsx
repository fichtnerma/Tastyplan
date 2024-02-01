import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import RatingButton from '../RatingButton';

describe('RatingButton', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<RatingButton />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
    it('renders component', () => {
        const { getByText, getAllByRole } = render(<RatingButton />);

        expect(getByText('How do you rate the recipe?')).toBeInTheDocument();
        expect(getAllByRole('button')).toHaveLength(5);
    });

    it('initially renders with zero rating', () => {
        const { getAllByTestId } = render(<RatingButton />);
        const starIcons = getAllByTestId('star-icon');
        expect(starIcons).toHaveLength(5);
        starIcons.forEach((icon) => {
            expect(icon).toHaveClass('fill-none');
        });
    });

    it('changes the rating on click', () => {
        const { getAllByTestId } = render(<RatingButton />);
        const starIcons = getAllByTestId('star-icon');

        fireEvent.click(starIcons[2]); // Click on the third star

        for (let i = 0; i < 3; i++) {
            expect(starIcons[i]).toHaveClass('fill-green-custom2');
        }

        for (let i = 3; i < 5; i++) {
            expect(starIcons[i]).toHaveClass('fill-none');
        }
    });
});
