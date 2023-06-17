import React from 'react';
import { Recipe, Step } from 'src/types/types';
import styles from './RecipeSteps.module.scss';

type RecipeStepsProps = {
    recipe: Recipe | undefined;
};

function RecipeSteps({ recipe }: RecipeStepsProps) {
    return (
        <div className="mt-10">
            <h3 className="text-green-custom2">The Recipe</h3>
            <div>
                {recipe?.steps?.map((step: Step) =>
                    step.stepCount % 2 == 0 ? (
                        <div key={step.stepCount} className="my-10">
                            <h4>Step {step.stepCount}</h4>
                            <div className="flex gap-20">
                                <p className={` ${styles.recipeText}`}>{step.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={step.stepCount} className="my-10">
                            <h4>Step {step.stepCount}</h4>
                            <div className="flex gap-20">
                                <p className={styles.recipeText}>{step.description}</p>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}

export default RecipeSteps;
