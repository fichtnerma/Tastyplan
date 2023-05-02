import ShoppingList from '@components/ShoppingList/ShoppingList';
import { Ingredient } from 'src/types/types';

const ingredientsDummy: Ingredient[] = [
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

function ShoppingListPage() {
    return (
        <div>
            <h1 className="h1-green">Your shopping list</h1>
            <h2>Things you need to buy</h2>
            <ShoppingList ingredients={ingredientsDummy} />
            <h2>Things you already have</h2>
        </div>
    );
}

export default ShoppingListPage;
