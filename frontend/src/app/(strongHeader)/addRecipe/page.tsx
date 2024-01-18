'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLogoLinkData } from '@contexts/LogoLinkContext';
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
    tags: string[];
};

const AddRecipePage = () => {
    const { setLogoLinkTarget } = useLogoLinkData();
    const [currentStep, setCurrentStep] = useState(1);
    const [newRecipe, setNewRecipe] = useState<CustomRecipe | undefined>(undefined);
    const [inputIsNotValid, setInputIsNotValid] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        setLogoLinkTarget('/weekOverview');
    }, []);

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

        if (res.status === 413) {
            toast.error('Image is too large!');
            return;
        }

        if (typeof window === 'undefined') return;

        if (res.ok) router.push('weekOverview', undefined);
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

        const transformedTags: string[] = recipe.tags.map((tag) => {
            return tag.value.charAt(0).toUpperCase() + tag.value.slice(1);
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
            tags: transformedTags,
        };
        return transformedRecipe;
    };

    const handleProgBarClick = (elementName: string) => {
        setCurrentStep(stepNames.findIndex((el) => el === elementName) + 1);
    };

    return (
        <div className="flex bg-white-custom px-10 py-8 lg:bg-green-custom4 lg:flex lg:items-center lg:justify-center lg:h-[90vh]">
            <div className="flex flex-col w-full bg-white-custom md:min-h-[675px] md:pb-4 lg:max-w-[1000px] lg:px-[5rem] lg:rounded-[30px] xl:max-w-[1200px]">
                <br />
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
                <div className="flex justify-between mt-4 md:mt-auto">
                    <button
                        className="btn-primary"
                        disabled={currentStep === 1}
                        onClick={() => setCurrentStep(currentStep - 1)}
                    >
                        Back
                    </button>
                    {currentStep !== stepNames.length ? (
                        <button
                            className="btn-primary"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            disabled={inputIsNotValid}
                        >
                            Next
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={sendData} disabled={inputIsNotValid}>
                            create recipe
                        </button>
                    )}
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    limit={1}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </div>
    );
};

export default AddRecipePage;
