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
        <div className="flex flex-col h-[90vh] px-4 pt-7 pb-4">
            <ProgressBar
                stepNames={stepNames}
                activeStep={currentStep}
                foodLifeStyleSelected={false}
                onClick={handleProgBarClick}
            />
            <br />
            <AddRecipeWizard />
            <div className="flex justify-between mt-auto">
                <button className="btn-primary">back</button>
                <button className="btn-primary">next</button>
            </div>
        </div>
    );
};

export default addRecipePage;
