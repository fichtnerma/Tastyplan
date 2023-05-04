import { useState } from 'react';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
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

function ShoppingListPage() {
    const [neededIngredients, setNeededIngredients] = useState<CustomSelectionInput[]>(
        ingredientsDummy1.map((ingredient, index) => {
            return {
                id: index + '',
                label: `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient.name} `,
                checked: false,
            };
        }),
    );

    const [presentIngredients, setPresentIngredients] = useState<CustomSelectionInput[]>([]);

    const handleNeededSelect = (id: string) => {
        const filteredNeededIngredients = neededIngredients.filter((ingredient) => ingredient.id !== id);
        const foundIngredient = neededIngredients.find((ingredient) => ingredient.id === id);
        if (foundIngredient) {
            foundIngredient.checked = true;
            const presentIngredientsCopy = [...presentIngredients];
            presentIngredientsCopy.push(foundIngredient);
            setPresentIngredients(presentIngredientsCopy);
        }
        setNeededIngredients(filteredNeededIngredients);
    };

    const handlePresentSelect = (id: string) => {
        const filteredPresentIngredients = presentIngredients.filter((ingredient) => ingredient.id !== id);

        const foundIngredient = presentIngredients.find((ingredient) => ingredient.id === id);

        if (foundIngredient) {
            foundIngredient.checked = false;
            const neededIngredientsCopy = [...neededIngredients];
            neededIngredientsCopy.push(foundIngredient);
            setNeededIngredients(neededIngredientsCopy);
        }
        setPresentIngredients(filteredPresentIngredients);
    };

    return (
        <div>
            <h1 className="h1-green">Your shopping list:</h1>
            <div className="flex w-full">
                <div className="mr-[20rem]">
                    <h2>Things you need:</h2>
                    <CheckboxGroup
                        checkboxes={neededIngredients}
                        groupName="ingredients2"
                        onCheckboxSelect={handleNeededSelect}
                        disabled={false}
                    />
                </div>
                <div>
                    <h2>Things you already have:</h2>
                    <CheckboxGroup
                        checkboxes={presentIngredients}
                        groupName="ingredients2"
                        onCheckboxSelect={handlePresentSelect}
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShoppingListPage;
