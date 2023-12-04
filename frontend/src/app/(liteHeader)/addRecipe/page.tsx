'use client';
import { useState } from 'react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import AddRecipeWizard from '@components/AddRecipeWizard/AddRecipeWizard';

const stepNames = ['Name and Image', 'Key Facts', 'Steps'];

const addRecipePage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleProgBarClick = (elementName: string) => {
        console.log(elementName);
    };

    return (
        <div>
            <h1>Add Recipe</h1>
            <ProgressBar
                stepNames={stepNames}
                activeStep={currentStep}
                foodLifeStyleSelected={false}
                onClick={handleProgBarClick}
            />
            <AddRecipeWizard />
            <div>
                <button>back</button>
                <button>next</button>
            </div>
        </div>
    );
};

export default addRecipePage;
