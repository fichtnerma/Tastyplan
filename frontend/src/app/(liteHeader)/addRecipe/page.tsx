'use client';
import { useState } from 'react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import AddRecipeWizard from '@components/AddRecipeWizard/AddRecipeWizard';

const stepNames = ['Name and Image', 'Key Facts', 'Add Ingredients', 'Steps'];

const AddRecipePage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const sendData = async () => {
        console.log('send Data');
    };

    return (
        <div className="flex flex-col h-[90vh] px-4 pt-7 pb-4">
            <ProgressBar
                stepNames={stepNames}
                activeStep={currentStep}
                foodLifeStyleSelected={false}
                onClick={() => setCurrentStep(currentStep + 1)}
            />
            <br />
            <AddRecipeWizard stepNr={currentStep} />
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
    );
};

export default AddRecipePage;
