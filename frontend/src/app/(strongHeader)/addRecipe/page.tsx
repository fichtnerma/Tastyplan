'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import AddRecipeWizard, { CustomRecipe } from '@components/AddRecipeWizard/AddRecipeWizard';
import { fetchWithAuth } from '@helpers/utils';

const stepNames = ['Name and Image', 'Key Facts', 'Add Ingredients', 'Steps'];

const AddRecipePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [newRecipe, setNewRecipe] = useState<CustomRecipe | undefined>(undefined);
    const { data: session } = useSession();

    const handleNewRecipe = (recipe: CustomRecipe) => {
        console.log(recipe);
        setNewRecipe(recipe);
    };

    const sendData = async () => {
        const form_data = new FormData();

        for (const key in newRecipe) {
            if (key === 'steps') {
                const steps = [...newRecipe[key]];
                const modfiedSteps = steps.map((step) => {
                    const { id, ...rest } = step;
                    return rest;
                });
                form_data.append(key, JSON.stringify(modfiedSteps));
            } else if (key === 'ingredients') {
                const ingredients = [...newRecipe[key]];
                const modifiedIngredients = ingredients.map(({ id, ingredient, ...rest }) => ({
                    ingredientId: id,
                    ...rest,
                }));
                form_data.append(key, JSON.stringify(modifiedIngredients));
            } else {
                form_data.append(key, newRecipe[key]);
            }
        }

        form_data.append('userId', session?.user.userId);

        for (const value of form_data.values()) {
            console.log(value);
        }

        const res = await fetch('/service/recipes/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.user.token}`,
            },
            body: form_data,
        });
        console.log(newRecipe);
    };

    return (
        <div className="bg-white-custom lg:bg-green-custom4 lg:h-[90vh] lg:flex justify-center lg:items-center">
            <div className="flex flex-col h-[90vh] px-4 pt-7 pb-4 bg-white-custom lg:max-h-[700px] lg:w-[800px] lg:px-[8rem]  lg:rounded-[30px]">
                <ProgressBar
                    stepNames={stepNames}
                    activeStep={currentStep}
                    foodLifeStyleSelected={false}
                    onClick={() => setCurrentStep(currentStep + 1)}
                />
                <span className="block mb-[4rem]"></span>
                <AddRecipeWizard stepNr={currentStep} onNewRecipe={handleNewRecipe} />
                <div className="flex justify-between mt-auto">
                    <button
                        className="btn-primary"
                        disabled={currentStep === 1}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    >
                        back
                    </button>
                    {currentStep !== stepNames.length ? (
                        <button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                            next
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={sendData}>
                            create recipe
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRecipePage;
