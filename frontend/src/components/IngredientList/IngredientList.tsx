'use client';
import React, { useState } from 'react';
import { Ingredient } from 'src/types/types';

type IngredientListProps = {
    ingredients: Array<Ingredient>;
};

const unitShorteningMap = new Map([
    ['teaspoon', 'tsp'],
    ['teaspoons', 'tsp'],
    ['tablespoon', 'tbsp'],
    ['tablespoons', 'tbsp'],
]);

function IngredientList({ ingredients }: IngredientListProps) {
    const [portion, setPortion] = useState(1);

    const changePortion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = e.currentTarget.getAttribute('data-anchor');
        if (clickedButton == '+') {
            setPortion(portion + 1);
        } else {
            if (portion > 1) {
                setPortion(portion - 1);
            }
        }
    };

    const truncateUnit = (unit: string) => {
        return unitShorteningMap.has(unit) ? unitShorteningMap.get(unit) : unit;
    };

    return (
        <div className="mb-8 lg:w-[420px] lg:py-6 lg:mb-0 lg:bg-green-custom4/30 lg:rounded-tl-[30px] lg:rounded-bl-[30px]">
            <div className="flex justify-between px-6 mb-6 lg:flex-col lg:px-8 lg:mb-8">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="text-white-custom w-[30px] h-[30px] rounded-[15px] bg-green-custom2 mr-2 disabled:bg-gray-custom2"
                        onClick={changePortion}
                        data-anchor={'-'}
                        disabled={portion <= 1}
                    >
                        <span className="block font-bold mb-[3px]">-</span>
                    </button>
                    <p id="portion" className="mr-2">
                        {portion}
                    </p>
                    <button
                        type="button"
                        className="text-white-custom w-[30px] h-[30px] rounded-[15px] bg-green-custom2 mr-2"
                        onClick={changePortion}
                        data-anchor={'+'}
                    >
                        <span className="block font-bold mb-[3px]">+</span>
                    </button>
                    <p className="h5 !mb-0">Servings</p>
                </div>
                {/* <button className="btn-primary">Refresh ShoppingList</button> */}
            </div>
            <h2 className="pl-6 mb-0">Ingredients</h2>
            <div className="mb-6 lg:mb-0">
                {ingredients?.map((ingredient) => (
                    <div key={ingredient.id} className="flex odd:bg-green-custom1 lg:py-1">
                        <p className="w-1/2 pl-6 font-semibold">
                            <span className="mr-2">{ingredient.quantity * portion}</span>
                            <span>{truncateUnit(ingredient.unit)}</span>
                        </p>
                        <p className="w-1/2 text-left">{ingredient.ingredient.name}</p>
                    </div>
                ))}
            </div>
            {/* <div className="pl-6 lg:pl-8">
                <h3 className="mb-0">Seasoning</h3>
            </div> */}
        </div>
    );
}

export default IngredientList;
