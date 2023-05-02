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
            <div className="flex mb-5">
                <button
                    type="button"
                    className={`btn-primary ${styles.btnPortion} mr-2`}
                    onClick={changePortion}
                    data-anchor={'-'}
                >
                    -
                </button>
                <p id="portion">{portion}</p>
                <button
                    type="button"
                    className={`btn-primary ${styles.btnPortion} ml-2 mr-5`}
                    onClick={changePortion}
                    data-anchor={'+'}
                >
                    +
                </button>
                <h5>Portionen</h5>
            </div>
            <h4>Ingridients</h4>
            <div className="my-5 mb-10">
                {ingredients?.map((ingredient) => (
                    <div key={'test'} className="grid grid-cols-3 gap-5 mb-2">
                        <p className="text-right col-span-1 font-semibold">
                            {ingredient.quantity * portion} {ingredient.unit}
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
