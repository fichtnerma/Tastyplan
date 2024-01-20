'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLogoLinkData } from '@contexts/LogoLinkContext';
import WeekplanConfig from '@components/WeekplanConfig/WeekplanConfig';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import Intolerances from '@components/Intolerances/Intolerances';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Dislikes from '@components/Dislikes/Dislikes';
import { fetchWithAuth } from '@helpers/utils';
import { APISearchResponse, CustomCheckboxInput } from 'src/types/types';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
}

const stepNames = ['Food Lifestyle', 'Intolerances', 'Dislikes', 'Weekplan'];

const SetupParentPage = () => {
    const { setLogoLinkTarget } = useLogoLinkData();
    const { data: session } = useSession();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [foodLifeStyleSelected, setFoodLifeStyleSelected] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergens: [],
        foodDislikes: [],
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        wantsLunch: true,
        wantsDinner: true,
        servings: 1,
    });

    useEffect(() => {
        setLogoLinkTarget('/');
    }, []);

    const [daysCheckboxes, setDays] = useState<CustomCheckboxInput[]>([
        {
            id: '0',
            label: 'Monday',
            checked: true,
            value: 'monday',
        },
        { id: '1', label: 'Tuesday', checked: true, value: 'tuesday' },
        { id: '2', label: 'Wednesday', checked: true, value: 'wednesday' },
        { id: '3', label: 'Thursday', checked: true, value: 'thursday' },
        { id: '4', label: 'Friday', checked: true, value: 'friday' },
        { id: '5', label: 'Saturday', checked: true, value: 'saturday' },
        { id: '6', label: 'Sunday', checked: true, value: 'sunday' },
    ]);

    const [mealsCheckboxes, setMealsCheckboxes] = useState<CustomCheckboxInput[]>([
        { id: '7', label: 'Lunch', checked: true, value: 'lunch' },
        { id: '8', label: 'Dinner', checked: true, value: 'dinner' },
    ]);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleProgBarClick = (elementName: string) => {
        setCurrentStep(stepNames.findIndex((el) => el === elementName) + 1);
    };

    const handleDaySelection = (id: string) => {
        const daysTemp = [...daysCheckboxes];
        const prefTemp = { ...preferences };
        const clickedDay = daysTemp.find((day) => day.id === id);
        if (!clickedDay) return;
        if (prefTemp.days.includes(clickedDay.value)) {
            clickedDay.checked = false;
            prefTemp.days = prefTemp.days.filter((dayT) => dayT !== clickedDay.value);
        } else {
            clickedDay.checked = true;
            prefTemp.days.push(clickedDay.value);
        }
        setDays(daysTemp);
        setPreferences(prefTemp);
    };

    const handleMealSelection = (id: string, value: string, checked: boolean) => {
        const mealsCheckboxesTemp = [...mealsCheckboxes];
        const preferencesTemp = { ...preferences };
        if (value === 'lunch') preferencesTemp.wantsLunch = checked;
        if (value === 'dinner') preferencesTemp.wantsDinner = checked;
        setPreferences(preferencesTemp);
        const foundMealCheckbox = mealsCheckboxesTemp.find((el) => el.value === value);
        if (foundMealCheckbox) foundMealCheckbox.checked = checked;
        setMealsCheckboxes(mealsCheckboxesTemp);
    };

    const handlePreferences = async (evt: React.MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();
        await fetchWithAuth(
            '/service/preferences',
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
            router.push(`/weekOverview`, undefined);
        }
    };

    return (
        <div className="bg-green-custom1 lg:h-[90vh] lg:flex lg:justify-center lg:items-center">
            <div className="flex justify-center items-center w-full">
                <form
                    className="w-full bg-white-custom px-4 pt-4 pb-2 lg:w-2/3 lg:px-16 lg:py-8 lg:rounded-[20px]"
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault();
                        }
                    }}
                >
                    <ProgressBar
                        stepNames={stepNames}
                        activeStep={currentStep}
                        stepIsDone={foodLifeStyleSelected}
                        onClick={handleProgBarClick}
                    />
                    <fieldset className="flex flex-col mt-8 lg:mt-14">
                        {currentStep === 1 && (
                            <FoodLifestyle
                                onNext={handleNextStep}
                                onChoice={(foodLifeStyle: string) => {
                                    setFoodLifeStyleSelected(true);
                                    setPreferences({
                                        formOfDiet: foodLifeStyle,
                                        allergens: preferences.allergens,
                                        foodDislikes: preferences.foodDislikes,
                                        days: preferences.days,
                                        wantsLunch: preferences.wantsLunch,
                                        wantsDinner: preferences.wantsDinner,
                                        servings: preferences.servings,
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
                                        days: preferences.days,
                                        wantsLunch: preferences.wantsLunch,
                                        wantsDinner: preferences.wantsDinner,
                                        servings: preferences.servings,
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
                                        days: preferences.days,
                                        wantsLunch: preferences.wantsLunch,
                                        wantsDinner: preferences.wantsDinner,
                                        servings: preferences.servings,
                                    });
                                }}
                                onBack={handleBackStep}
                                foodDislikes={preferences.foodDislikes}
                                onNext={handleNextStep}
                            />
                        )}
                        {currentStep === 4 && (
                            <WeekplanConfig
                                onChoice={(servings: number) => {
                                    setPreferences({
                                        formOfDiet: preferences.formOfDiet,
                                        allergens: preferences.allergens,
                                        foodDislikes: preferences.foodDislikes,
                                        days: preferences.days,
                                        wantsLunch: preferences.wantsLunch,
                                        wantsDinner: preferences.wantsDinner,
                                        servings: servings,
                                    });
                                }}
                                onBack={handleBackStep}
                                servings={preferences.servings}
                                handlePreferences={handlePreferences}
                                daysCheckboxes={daysCheckboxes}
                                handleDaySelection={handleDaySelection}
                                mealsCheckboxes={mealsCheckboxes}
                                handleMealSelection={handleMealSelection}
                            />
                        )}
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SetupParentPage;
