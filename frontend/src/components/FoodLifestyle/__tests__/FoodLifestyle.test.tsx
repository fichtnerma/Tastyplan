import { axe } from 'jest-axe';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodLifestyle from '../FoodLifestyle';

describe('FoodLifestyle', () => {
    it('should not have basic accessibility issues', async () => {
        const mockOnNext = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFormOfDiet = '';
        const { container } = render(
            <FoodLifestyle onNext={mockOnNext} onChoice={mockOnChoice} formOfDiet={mockFormOfDiet} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
    it('renders h4 correctly', () => {
        const mockOnNext = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFormOfDiet = '';

        render(<FoodLifestyle onNext={mockOnNext} onChoice={mockOnChoice} formOfDiet={mockFormOfDiet} />);

        const h4Element = screen.getByRole('heading', { level: 4 });

        expect(h4Element).toBeInTheDocument();
        expect(h4Element.textContent).toBe('What is your food lifestyle?');
    });

    it('renders 5 radio buttons correctly', () => {
        const mockOnNext = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFormOfDiet = '';

        render(<FoodLifestyle onNext={mockOnNext} onChoice={mockOnChoice} formOfDiet={mockFormOfDiet} />);

        const radioButtons = screen.getAllByRole('radio');

        expect(radioButtons).toHaveLength(5);
    });

    it('calls onChoiceChange when radio button is clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFormOfDiet = '';

        render(<FoodLifestyle onNext={mockOnNext} onChoice={mockOnChoice} formOfDiet={mockFormOfDiet} />);

        const radioButton = screen.getAllByRole('radio');

        fireEvent.click(radioButton[0]);

        expect(mockOnChoice).toHaveBeenCalled();
    });

    it('calls onSubmitSelection when button is clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnChoice = jest.fn();
        const mockFormOfDiet = 'vegan';

        render(<FoodLifestyle onNext={mockOnNext} onChoice={mockOnChoice} formOfDiet={mockFormOfDiet} />);

        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
