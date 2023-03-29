import React, { useState } from 'react';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
// import StepTwo from './StepTwo';
// import StepThree from './StepThree';

const SetupParentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (
        <div>
            {currentStep === 1 && <FoodLifestyle />}
            {/* {currentStep === 2 && <StepTwo onNext={handleNextStep} />}
            {currentStep === 3 && <StepThree />} */}
        </div>
    );
};

export default SetupParentPage;
