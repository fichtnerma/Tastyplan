import { axe } from 'jest-axe';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Intolerances from '../Intolerances';

describe('Intolerances', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockAllergens: string[] = [];
        const { container } = render(
            <Intolerances onNext={mockOnNext} onBack={mockOnBack} onChoice={mockOnChoice} allergens={mockAllergens} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('render 16 checkboxes correctly', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockAllergens: string[] = [];

        render(
            <Intolerances onNext={mockOnNext} onBack={mockOnBack} onChoice={mockOnChoice} allergens={mockAllergens} />,
        );

        const checkboxes = screen.getAllByRole('checkbox');

        expect(checkboxes).toHaveLength(16);
    });

    it('calls onChoice when checkbox is clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockAllergens: string[] = [];

        render(
            <Intolerances onNext={mockOnNext} onBack={mockOnBack} onChoice={mockOnChoice} allergens={mockAllergens} />,
        );

        const checkbox = screen.getAllByRole('checkbox');

        fireEvent.click(checkbox[0]);

        expect(mockOnChoice).toHaveBeenCalled();
    });

    it('calls handleClick when back button is clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockAllergens: string[] = [];

        render(
            <Intolerances onNext={mockOnNext} onBack={mockOnBack} onChoice={mockOnChoice} allergens={mockAllergens} />,
        );

        const button = screen.getAllByRole('button', { name: /back/i });

        fireEvent.click(button[0]);

        expect(mockOnBack).toHaveBeenCalled();
    });

    it('calls handleClick when next button is clicked', () => {
        const mockOnNext = jest.fn();
        const mockOnBack = jest.fn();
        const mockOnChoice = jest.fn();
        const mockAllergens: string[] = [];

        render(
            <Intolerances onNext={mockOnNext} onBack={mockOnBack} onChoice={mockOnChoice} allergens={mockAllergens} />,
        );

        const button = screen.getAllByRole('button', { name: /next/i });

        fireEvent.click(button[0]);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
