import CheckBox from '@components/CheckBox/CheckBox';
import { Ingredient } from 'src/types/types';

type ShoppingListProps = {
    ingredients: Ingredient[];
};

function IngredientsCheckboxList({ ingredients }: ShoppingListProps) {
    return (
        <ul>
            {ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.name}>
                    <CheckBox label={ingredient.ingredient.name} />
                </li>
            ))}
        </ul>
    );
}

export default IngredientsCheckboxList;
