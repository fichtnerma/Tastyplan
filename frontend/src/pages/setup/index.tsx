import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import Intolerances from '@components/Intolerances/Intolerances';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Dislikes from '@components/Dislikes/Dislikes';
import { fetchWithAuth } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import logo from '../../../public/logo.svg';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
}

const stepNames = ['Food Lifestyle', 'Intolerances', 'Dislikes'];

const SetupParentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [foodLifeStyleSelected, setFoodLifeStyleSelected] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergens: [],
        foodDislikes: [],
    });

    const router = useRouter();

    const { data: session } = useSession();

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleProgBarClick = (elementName: string) => {
        setCurrentStep(stepNames.findIndex((el) => el === elementName) + 1);
    };

    const handlePreferences = async (evt: React.MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();
        await fetchWithAuth(
            '/service/preferences/',
            {
                method: 'POST',
                body: JSON.stringify(preferences),
            },
            session,
        );

        const weekplanRes = await fetchWithAuth(
            '/service/weekplan/create',
            {
                method: 'POST',
            },
            session,
        );

        if (weekplanRes.ok) {
            router.push(`${router.basePath}/weekOverview`, undefined, undefined);
        }
    };

    return (
        <div className="relative w-full">
            <div className="absolute top-0 left-0">
                <Image src={logo} className="" alt="logo" width={200} priority />
            </div>
            <div className="flex justify-center items-center h-71v w-2/3 ml-50">
                <form
                    className="w-full bg-white-custom rounded-[20px] px-16 py-8"
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault();
                        }
                    }}
                >
                    <ProgressBar
                        stepNames={stepNames}
                        activeStep={currentStep}
                        foodLifeStyleSelected={foodLifeStyleSelected}
                        onClick={handleProgBarClick}
                    />
                    <fieldset className="flex flex-col mt-14">
                        {currentStep === 1 && (
                            <FoodLifestyle
                                onNext={handleNextStep}
                                onChoice={(foodLifeStyle: string) => {
                                    setFoodLifeStyleSelected(true);
                                    setPreferences({
                                        formOfDiet: foodLifeStyle,
                                        allergens: preferences.allergens,
                                        foodDislikes: preferences.foodDislikes,
                                    });
                                }}
                                formOfDiet={preferences.formOfDiet}
                            />
                        )}
                        {currentStep === 2 && (
                            <Intolerances
                                onNext={handleNextStep}
                                onBack={handleBackStep}
                                onChoice={(allergens: string[]) => {
                                    setPreferences({
                                        formOfDiet: preferences.formOfDiet,
                                        allergens: allergens,
                                        foodDislikes: preferences.foodDislikes,
                                    });
                                }}
                                allergens={preferences.allergens}
                            />
                        )}
                        {currentStep === 3 && (
                            <Dislikes
                                onChoice={(foodDislikes: APISearchResponse[]) => {
                                    setPreferences({
                                        formOfDiet: preferences.formOfDiet,
                                        allergens: preferences.allergens,
                                        foodDislikes: foodDislikes,
                                    });
                                }}
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
