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
    const [inputIsNotValid, setInputIsNotValid] = useState(true);
    const { data: session } = useSession();

    const handleNewRecipe = (recipe: CustomRecipe) => {
        setNewRecipe(recipe);
    };

    const sendData = async () => {
        console.log('sendData');
    };

    return (
        <div className="bg-white-custom px-10 py-8 lg:bg-green-custom4 lg:flex lg:items-center lg:justify-center lg:h-[90vh]">
            <div className="flex flex-col w-full pt-7 pb-4 bg-white-custom md:h-[900px] lg:max-w-[1000px] lg:px-[5rem] lg:rounded-[30px] xl:max-w-[1200px]">
                <ProgressBar
                    stepNames={stepNames}
                    activeStep={currentStep}
                    foodLifeStyleSelected={false}
                    onClick={() => setCurrentStep(currentStep + 1)}
                />
                <span className="block mb-[4rem]"></span>
                <AddRecipeWizard
                    stepNr={currentStep}
                    onNewRecipe={handleNewRecipe}
                    onInputisInvalid={(inputIsNotValid: boolean) => setInputIsNotValid(inputIsNotValid)}
                />
                <div className="flex justify-between mt-5 md:mt-auto">
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
