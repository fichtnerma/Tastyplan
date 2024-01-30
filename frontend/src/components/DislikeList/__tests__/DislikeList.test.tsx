import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { APISearchResponse, Allergen } from 'src/types/types';
import DislikeList from '../DislikeList';

describe('DislikeList', () => {
    it('should not have basic accessibility issues', async () => {
        const mockOnDeleteChoice = jest.fn();
        const mockDislikes: (APISearchResponse | Allergen)[] = [
            { id: 1, name: 'Test Dislike 1' },
            { id: 2, name: 'Test Dislike 2' },
        ];

        const { container } = render(<DislikeList dislikes={mockDislikes} onDeleteChoice={mockOnDeleteChoice} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders without crashing', () => {
        const mockProps = {
            dislikes: [{ id: 1, name: 'Dislike 1' }],
            onDeleteChoice: jest.fn(),
        };

        const { container } = render(<DislikeList {...mockProps} />);
        expect(container).toBeTruthy();
    });

    it('renders a dislike item with the correct name', () => {
        const mockProps = {
            dislikes: [{ id: 1, name: 'Dislike 1' }],
            onDeleteChoice: jest.fn(),
        };

        const { getByText } = render(<DislikeList {...mockProps} />);
        const dislikeItem = getByText('Dislike 1');
        expect(dislikeItem).toBeInTheDocument();
    });

    it('calls onDeleteChoice when the remove button is clicked', () => {
        const mockProps = {
            dislikes: [{ id: 1, name: 'Dislike 1' }],
            onDeleteChoice: jest.fn(),
        };

        const { getByTestId } = render(<DislikeList {...mockProps} />);
        const removeButton = getByTestId('remove-Dislike 1');
        fireEvent.click(removeButton);
        expect(mockProps.onDeleteChoice).toHaveBeenCalledWith('Dislike 1');
    });
});
