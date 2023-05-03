import RadioGroup from '@components/FormInputs/RadioGroup/RadioGroup';
import { CustomSelectionInput, Ingredient } from 'src/types/types';

const ingredientsDummy1: Ingredient[] = [
    {
        ingredient: { name: 'tomatoes' },
        quantity: 150,
        unit: 'g',
    },
    {
        ingredient: { name: 'apples' },
        quantity: 5,
        unit: '',
    },
    {
        ingredient: { name: 'lemons' },
        quantity: 3,
        unit: '',
    },
    {
        ingredient: { name: 'letuce' },
        quantity: 1,
        unit: '',
    },
    {
        ingredient: { name: 'butter' },
        quantity: 300,
        unit: 'g',
    },
    {
        ingredient: { name: 'flour' },
        quantity: 0,
        unit: '',
    },
];

const radioBtns: CustomSelectionInput[] = ingredientsDummy1.map((ingredient, index) => {
    return {
        id: index + '',
        label: `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient.name} `,
        checked: false,
    };
});

function ShoppingListPage() {
    return (
        <div>
            <h1 className="h1-green">Your shopping list</h1>
            <div className="flex">
                <h2>Things you already have</h2>
                <h2>Things you need to buy</h2>
            </div>
            <RadioGroup radioBtns={[...radioBtns]} groupName="ingredients2" />
        </div>
    );
}

export default ShoppingListPage;
