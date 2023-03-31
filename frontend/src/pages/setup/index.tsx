import React, { useEffect, useState } from 'react';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Intolerances from '@components/Intolerances/Intolerances';
import Dislikes from '@components/Dislikes/Dislikes';

interface SetupParentPageProps {}
interface Preferences {
    formOfDiet: string;
    allergenes: string[];
    foodDislikes: APISearchResponse[];
}

import logo from '../../../public/logo.svg';
import Image from 'next/image';
import { APISearchResponse } from 'src/types/types';
import ProgressBar from '@components/ProgressBar/ProgressBar';

const SetupParentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergenes: [],
        foodDislikes: [],
    });

    useEffect(() => {
        console.log(preferences);
    }, [preferences]);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleFoodLifestyle = (choice: any) => {
        setPreferences(choice);
    };

    const handleDislikes = (choice: any) => {
        setPreferences(choice);
    };

    return (
        <div>
            <Image src={logo} className="ml-24 mb-8" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <form className="flex flex-col justify-center py-8 px-12 h-70v w-2/3 bg-white-custom rounded-[20px]">
                    <ProgressBar stepsCount={3} activeStep={currentStep} />
                    <fieldset className="flex flex-col mt-10">
                        {currentStep === 1 && (
                            <FoodLifestyle
                                onNext={handleNextStep}
                                onChoice={handleFoodLifestyle}
                                formOfDiet={preferences.formOfDiet}
                            />
                        )}
                        {currentStep === 2 && (
                            <Intolerances
                                onNext={handleNextStep}
                                onBack={handleBackStep}
                                onChoice={handleFoodLifestyle}
                                allergenes={preferences.allergenes}
                            />
                        )}
                        {currentStep === 3 && (
                            <Dislikes
                                onChoice={handleDislikes}
                                onBack={handleBackStep}
                                foodDislikes={preferences.foodDislikes}
                            />
                        )}
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SetupParentPage;
