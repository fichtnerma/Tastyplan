import Checkbox from '@components/Checkbox/Checkbox';
import { Ingredient } from 'src/types/types';

type ShoppingListProps = {
    ingredients: Ingredient[];
};

function IngredientsCheckboxList({ ingredients }: ShoppingListProps) {
    return (
        <ul>
            {ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.name}>
                    <Checkbox label={ingredient.ingredient.name} />
                </li>
            ))}
        </ul>
    );
}

export default IngredientsCheckboxList;
