'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import AddRecipeWizard, { CustomRecipe } from '@components/AddRecipeWizard/AddRecipeWizard';
import { fetchWithAuth, fetchWithAuthFormData } from '@helpers/utils';

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
            form_data.append(key, newRecipe[key]);
        }
        form_data.append('useId', session?.user.id);
        const res = await fetchWithAuth(
            '/service/recipes/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: form_data,
            },
            session,
        );
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
