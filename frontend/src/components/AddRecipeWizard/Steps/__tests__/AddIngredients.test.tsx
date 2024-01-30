import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import AddIngredients from '../AddIngredients';

const props = {
    currentIngredients: [
        {
            id: 1,
            ingredient: { name: 'ingredient 1' },
            quantity: 1,
            unit: 'g',
        },
        {
            id: 2,
            ingredient: { name: 'ingredient 2' },
            quantity: 2,
            unit: 'kg',
        },
        {
            id: 3,
            ingredient: { name: 'ingredient 3' },
            quantity: 3,
            unit: 'ml',
        },
        {
            id: 4,
            ingredient: { name: 'ingredient 4' },
            quantity: 4,
            unit: 'l',
        },
    ],
    onChangeIngredients: jest.fn(),
};

describe('AddIngredients component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render initial ingredients', () => {
        render(
            <AddIngredients
                currentIngredients={props.currentIngredients}
                onChangeIngredients={props.onChangeIngredients}
            />,
        );

        expect(screen.getByTestId('fieldset')).toBeInTheDocument();
        expect(screen.getByText('Add ingredients')).toBeInTheDocument();
        const ingredients = screen.getAllByTestId('ingredient-wrapper');
        expect(ingredients).toHaveLength(4);
        expect(ingredients[3].firstChild).toHaveTextContent('4 l');
        expect(ingredients[2]).toHaveTextContent('3 ml ingredient 3');
    });
    it('should render interactive elements for adding ingredients', () => {
        render(
            <AddIngredients
                currentIngredients={props.currentIngredients}
                onChangeIngredients={props.onChangeIngredients}
            />,
        );
        const comboxes = screen.queryAllByRole('combobox');
        expect(comboxes).toHaveLength(2);
        expect(screen.getByText('Search ingredient *'));
        expect(document.querySelector('#selectIngredient') as HTMLElement).toBeInTheDocument();
        expect(screen.getByText('Unit *'));
        expect(document.querySelector('#selectUnit') as HTMLElement).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        const addIngredientBtn = screen.getByTestId('add-ingredient-btn');
        expect(addIngredientBtn).toBeInTheDocument();
        expect(addIngredientBtn).toHaveAttribute('disabled');
    });
    it('should remove selected ingredient', () => {
        render(
            <AddIngredients
                currentIngredients={props.currentIngredients}
                onChangeIngredients={props.onChangeIngredients}
            />,
        );

        const removeIngredientBtns = screen.queryAllByTestId('remove-ingredient-btn');
        fireEvent.click(removeIngredientBtns[0]);
        const ingredients = screen.getAllByTestId('ingredient-wrapper');
        expect(ingredients).toHaveLength(3);
    });
    it('should add new ingredient', async () => {
        render(
            <AddIngredients
                currentIngredients={props.currentIngredients}
                onChangeIngredients={props.onChangeIngredients}
            />,
        );
    });
});
