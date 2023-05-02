import React from 'react';
import { Ingredient } from 'src/types/types';

type IngredientListProps = {
    ingredients: Array<Ingredient> | undefined;
};

function IngredientList({ ingredients }: IngredientListProps) {
    return (
        <div>
            <div className="flex mb-5">
                <button type="button" className="btn-primary mt-10" data-btn="back">
                    -
                </button>
                <p>1</p>
                <button type="button" className="btn-primary mt-10" data-btn="back">
                    +
                </button>
                <h5>Portionen</h5>
            </div>
            <h4>Ingridients</h4>
            <div className="my-5 mb-10">
                {ingredients?.map((ingredient) => (
                    <div key={'test'} className="grid grid-cols-3 gap-5 mb-2">
                        <p className="text-right col-span-1 font-semibold">
                            {ingredient.quantity} {ingredient.unit}
                        </p>
                        <p className="text-left col-span-2 mr-2">{ingredient.ingredient.name}</p>
                    </div>
                ))}
            </div>
            <h5>Seasoning</h5>
            <div className="grid place-content-center">
                <button type="button" className="btn-primary mt-10 mb-10">
                    Go to Shoppinglist
                </button>
            </div>
        </div>
    );
}

export default IngredientList;
