import React, { useState } from 'react';
import { Ingredient } from 'src/types/types';
import styles from './IngredientList.module.scss';

type IngredientListProps = {
    ingredients: Array<Ingredient> | undefined;
};

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
    return (
        <div>
            <div className="flex justify-between px-6">
                <div className="flex items-center">
                    <button
                        type="button"
                        className={`btn-primary ${styles.btnPortion} mr-2`}
                        onClick={changePortion}
                        data-anchor={'-'}
                    >
                        <span className="block font-bold pb-[4px]">-</span>
                    </button>
                    <p id="portion" className="mr-2">
                        {portion}
                    </p>
                    <button
                        type="button"
                        className={`btn-primary ${styles.btnPortion} mr-2`}
                        onClick={changePortion}
                        data-anchor={'+'}
                    >
                        <span className="block font-bold pb-[4px]">+</span>
                    </button>
                    <p className="h5 !mb-0">Portionen</p>
                </div>
                <button className="btn-primary">Refresh ShoppingList</button>
            </div>
            <h2 className="px-6 mb-0">Ingridients</h2>
            <div className="mb-6">
                {ingredients?.map((ingredient, index) => (
                    <div key={index} className="flex odd:bg-green-custom1">
                        <p className="w-1/2 pl-6 font-semibold">
                            {ingredient.quantity * portion} {ingredient.unit}
                        </p>
                        <p className="w-1/2 text-left">{ingredient.ingredient.name}</p>
                    </div>
                ))}
            </div>
            <div className="px-6">
                <h3>Seasoning</h3>
            </div>
        </div>
    );
}

export default IngredientList;
