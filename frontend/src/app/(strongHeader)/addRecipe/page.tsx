'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import AddRecipeWizard, { CustomRecipe } from '@components/AddRecipeWizard/AddRecipeWizard';
import { fetchWithAuth } from '@helpers/utils';

const stepNames = ['Name and Image', 'Key Facts', 'Add Ingredients', 'Steps'];

type Ingredient = {
    ingredientId: number;
    unit: string;
    quantity: number;
};

type Step = {
    description: string;
    stepCount: number;
};

type RecipeTransformed = {
    name: string;
    servings: number;
    formOfDiet: string;
    ingredients: Ingredient[];
    steps: Step[];
    imageBase64: string | undefined;
    userId: string;
};

const AddRecipePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [newRecipe, setNewRecipe] = useState<CustomRecipe | undefined>(undefined);
    const [inputIsNotValid, setInputIsNotValid] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        //console.log(newRecipe);
    });

    const handleNewRecipe = (recipe: CustomRecipe) => {
        setNewRecipe(recipe);
    };

    const sendData = async () => {
        if (!newRecipe) return;
        const transformedRecipe = transformRecipe({ ...newRecipe });
        const res = await fetchWithAuth(
            '/service/recipes/create',
            {
                method: 'POST',
                body: JSON.stringify(transformedRecipe),
            },
            session,
        );
    };

    const transformRecipe = (recipe: CustomRecipe): RecipeTransformed | void => {
        const tranformedIngredients: Ingredient[] = recipe.ingredients.map((ingredient) => {
            let ingredientID = ingredient.id;
            if (!ingredientID) ingredientID = 0;
            return { ingredientId: ingredientID, unit: ingredient.unit, quantity: ingredient.quantity };
        });

        const transformedSteps: Step[] = recipe.steps.map((step, i) => {
            return { description: step.description, stepCount: i + 1 };
        });

        if (!session?.user.userId) return;

        const transformedRecipe: RecipeTransformed = {
            name: recipe.name,
            servings: recipe.servings,
            formOfDiet: recipe.formOfDiet,
            ingredients: [...tranformedIngredients],
            steps: [...transformedSteps],
            imageBase64: recipe.image ? recipe.image.split(',')[1] : undefined,
            userId: session?.user.userId,
        };
        return transformedRecipe;
    };

    const handleProgBarClick = (elementName: string) => {
        setCurrentStep(stepNames.findIndex((el) => el === elementName) + 1);
    };

    return (
        <div className="bg-white-custom px-10 py-8 lg:bg-green-custom4 lg:flex lg:items-center lg:justify-center lg:h-[90vh]">
            <div className="flex flex-col w-full pt-7 pb-4 bg-white-custom md:h-[900px] lg:max-w-[1000px] lg:px-[5rem] lg:rounded-[30px] xl:max-w-[1200px]">
                <ProgressBar
                    stepNames={stepNames}
                    activeStep={currentStep}
                    stepIsDone={!inputIsNotValid}
                    onClick={handleProgBarClick}
                />
                <span className="block mb-[4rem]"></span>
                <AddRecipeWizard
                    stepNr={currentStep}
                    onNewRecipe={handleNewRecipe}
                    onInputisInvalid={(inputIsNotValid: boolean) => setInputIsNotValid(inputIsNotValid)}
                />
                <div className="flex justify-between mt-5">
                    <button
                        className="btn-primary"
                        disabled={currentStep === 1}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    >
                        back
                    </button>
                    {currentStep !== stepNames.length ? (
                        <button
                            className="btn-primary"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={inputIsNotValid}
                        >
                            next
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={sendData} disabled={inputIsNotValid}>
                            create recipe
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddRecipePage;
