import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { APISearchResponse } from 'src/types/types';
import Dislikes from '../Dislikes';

describe('Dislikes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it.skip('should not have basic accessibility issues', async () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [];

        const { container } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('should render 5 dislike categories', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [];

        const { container } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        const dislikeRecommendations = container.querySelectorAll('button[data-id]');

        expect(dislikeRecommendations).toHaveLength(7);
    });

    it('calls onNext and onBack when the corresponding buttons are clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [];

        const { getByText } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        fireEvent.click(getByText('Next'));
        expect(mockOnNext).toHaveBeenCalled();

        fireEvent.click(getByText('Back'));
        expect(mockOnBack).toHaveBeenCalled();
    });

    it('calls onChoice when a dislike recommendation is added', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [];

        const { getByText } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        fireEvent.click(getByText('Brussel sprouts'));
        expect(mockOnChoice).toHaveBeenCalled();
    });

    it('renders without crashing', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [];

        const { container } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        expect(container).toBeTruthy();
    });

    it('removes the correct dislike when onDeleteChoice is called', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFoodDislikes: APISearchResponse[] = [
            { id: 612, name: 'brussels sprouts, steamed' },
            { id: 613, name: 'brussels sprouts, raw' },
        ];

        const { getByRole } = render(
            <Dislikes
                onNext={mockOnNext}
                onBack={mockOnBack}
                onChoice={mockOnChoice}
                foodDislikes={mockFoodDislikes}
            />,
        );

        const button = getByRole('button', { name: /Brussel sprouts/i });

        fireEvent.click(button);
        expect(mockOnChoice).toHaveBeenCalledWith([
            { id: 612, name: 'brussels sprouts, steamed' },
            { id: 613, name: 'brussels sprouts, raw' },
        ]);
    });
});
