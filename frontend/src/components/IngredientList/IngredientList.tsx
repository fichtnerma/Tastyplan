import React from 'react';
import { Ingredient } from 'src/types/types';

type IngredientListProps = {
    ingredients: Array<Ingredient> | undefined;
};

function IngredientList({ ingredients }: IngredientListProps) {
    const ingredientsSplited = spiltSteps(ingredients, 5);
    return (
        <div>
            <h4>Ingridients:</h4>
            <div className="grid grid-cols-2">
                <div>
                    {ingredientsSplited?.firstHalf.map((ingredient) => (
                        <div key={'test'} className="grid grid-cols-3 gap-5">
                            <p className="text-right ">
                                {ingredient.quantity} {ingredient.unit}
                            </p>
                            <p className="text-left w-44">{ingredient.ingredient.name}</p>
                        </div>
                    ))}
                </div>
                <div>
                    {ingredientsSplited?.secondHalf.map((ingredient) => (
                        <div key={'test'} className="grid grid-cols-3 gap-5">
                            <p className="text-right ">
                                {ingredient.quantity} {ingredient.unit}
                            </p>
                            <p className="text-left w-44">{ingredient.ingredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function spiltSteps(list: Array<Ingredient> | undefined, cut: number) {
    if (!list) {
        return;
    }
    let firstHalf: Array<Ingredient> = [];
    let secondHalf: Array<Ingredient> = [];
    if (list.length > cut) {
        const half = Math.ceil(list.length / 2);

        firstHalf = list.slice(0, half);
        secondHalf = list.slice(half);
        return { firstHalf, secondHalf };
    }

    firstHalf = list;
    return { firstHalf, secondHalf };
}

export default IngredientList;
