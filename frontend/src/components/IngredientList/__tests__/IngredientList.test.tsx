import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IngredientList from '../IngredientList';

describe('IngredientList', () => {
    const ingredients = [
        { id: 1, quantity: 2, unit: 'teaspoons', ingredient: { name: 'Salt' } },
        { id: 2, quantity: 1, unit: 'tablespoon', ingredient: { name: 'Sugar' } },
    ];

    it('renders without crashing', () => {
        render(<IngredientList ingredients={ingredients} />);
        expect(screen.getByText('Ingredients')).toBeInTheDocument();
    });

    it('renders ingredients with default values', () => {
        render(<IngredientList ingredients={ingredients} />);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Salt')).toBeInTheDocument();
        expect(screen.getByText('Sugar')).toBeInTheDocument();
    });

    it('updates portion when buttons are clicked', () => {
        render(<IngredientList ingredients={ingredients} isItemRemovable={false} />);
        fireEvent.click(screen.getByTestId('increment-portion'));
        expect(screen.getByTestId('portion-size')).toHaveTextContent('2');
        fireEvent.click(screen.getByTestId('decrement-portion'));
        expect(screen.getByTestId('portion-size')).toHaveTextContent('1');
    });

    it('calls onItemRemove when delete button is clicked', () => {
        const onItemRemoveMock = jest.fn();
        render(<IngredientList ingredients={ingredients} onItemRemove={onItemRemoveMock} decoration={true} />);

        fireEvent.click(screen.getAllByLabelText('close')[0]);
        expect(onItemRemoveMock).toHaveBeenCalledWith(1);
    });

    it('disables the "-" button when portion is 1', () => {
        render(<IngredientList ingredients={ingredients} isItemRemovable={false} />);
        expect(screen.getByTestId('decrement-portion')).toBeDisabled();
    });

    it('does not disable the "-" button when portion is greater than 1', () => {
        render(<IngredientList ingredients={ingredients} isItemRemovable={false} />);
        fireEvent.click(screen.getByTestId('decrement-portion'));
        expect(screen.getByText('-')).not.toBeDisabled();
    });

    it.skip('does correctly handle delete', () => {
        render(<IngredientList ingredients={ingredients} isItemRemovable={true} />);
    });
});
