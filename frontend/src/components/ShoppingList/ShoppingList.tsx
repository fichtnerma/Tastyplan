import Checkbox from '@components/FormInputs/Checkbox';
import { Ingredient } from 'src/types/types';

type ShoppingListProps = {
    ingredients: Ingredient[];
};

function ShoppingList({ ingredients }: ShoppingListProps) {
    return (
        <ul>
            {ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.name} className="mb-4 last:mb-0">
                    <Checkbox
                        label={`${ingredient.quantity !== 0 ? ingredient.quantity : ''} ${ingredient.unit} ${
                            ingredient.ingredient.name
                        }`}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ShoppingList;
