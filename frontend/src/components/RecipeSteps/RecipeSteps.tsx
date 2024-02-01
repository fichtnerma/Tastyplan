import React from 'react';
import { Recipe, Step } from 'src/types/types';

type RecipeStepsProps = {
    recipe: Recipe | undefined;
};

function RecipeSteps({ recipe }: RecipeStepsProps) {
    return (
        <>
            <h2 className="text-green-custom2">The Recipe</h2>
            <div data-cy={'recipe-steps-wrapper'}>
                {recipe?.steps?.map((step: Step) =>
                    step.stepCount % 2 == 0 ? (
                        <div key={step.stepCount} className="mb-10 last:mb-0">
                            <h3>Step {step.stepCount}</h3>
                            <div className="">
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={step.stepCount} className="mb-10 last:mb-0">
                            <h3>Step {step.stepCount}</h3>
                            <div className="">
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </>
    );
}

export default RecipeSteps;
