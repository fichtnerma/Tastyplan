import React, { useEffect, useState } from 'react';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Intolerances from '@components/Intolerances/Intolerances';
import Dislikes from '@components/Dislikes/Dislikes';

interface SetupParentPageProps {}
interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
}

import logo from '../../../public/logo.svg';
import Image from 'next/image';
import { APISearchResponse } from 'src/types/types';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import { useSession } from 'next-auth/react';

const SetupParentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergens: [],
        foodDislikes: [],
    });
    const { data: session, status } = useSession();

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };
    console.log(session);
    
    const handlePreferences = async (evt: any) => {
        evt.preventDefault();
        await fetch('http://localhost:3000/preferences/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "user": session?.user.userId ? session.user.userId : '',
            },
            body: JSON.stringify(preferences),
        })
        await fetch('http://localhost:3000/weekplan/create', {   
            method: 'POST',
            headers: {
                "user": session?.user.userId ? session.user.userId : '',
            },
        })
        window.location.href = '/weekOverview';
    };

    return (
        <div>
            <Image src={logo} className="ml-24 mb-8" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <form className="flex flex-col justify-center py-8 px-12 h-70v w-5/6 bg-white-custom rounded-[20px]">
                    <ProgressBar stepsCount={3} activeStep={currentStep} />
                    <fieldset className="flex flex-col mt-10">
                        {currentStep === 1 && (
                            <FoodLifestyle
                                onNext={handleNextStep}
                                onChoice={setPreferences}
                                formOfDiet={preferences.formOfDiet}
                            />
                        )}
                        {currentStep === 2 && (
                            <Intolerances
                                onNext={handleNextStep}
                                onBack={handleBackStep}
                                onChoice={setPreferences}
                                allergens={preferences.allergens}
                            />
                        )}
                        {currentStep === 3 && (
                            <Dislikes
                                onChoice={setPreferences}
                                onBack={handleBackStep}
                                foodDislikes={preferences.foodDislikes}
                                handlePreferences={handlePreferences}
                            />
                        )}
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SetupParentPage;
