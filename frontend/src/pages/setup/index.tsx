import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import WeekplanConfig from '@components/WeekplanConfig/WeekplanConfig';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import MobileHeader from '@components/Layout/MobileHeader';
import DesktopHeader from '@components/Layout/DesktopHeader';
import Intolerances from '@components/Intolerances/Intolerances';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Dislikes from '@components/Dislikes/Dislikes';
import { fetchWithAuth } from '@helpers/utils';
import { APISearchResponse, CustomSelectionInput } from 'src/types/types';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    weekConfig: WeekConfig;
}

interface WeekConfig {
    days: string[];
    meals: string[];
    servings: number;
}

const stepNames = ['Food Lifestyle', 'Intolerances', 'Dislikes', 'Weekplan'];

const SetupParentPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [foodLifeStyleSelected, setFoodLifeStyleSelected] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergens: [],
        foodDislikes: [],
        weekConfig: { days: [], meals: [], servings: 1 },
    });

    const [daysCheckboxes, setDays] = useState<CustomSelectionInput[]>([
        {
            id: '0',
            label: 'Monday',
            checked: false,
        },
        { id: '1', label: 'Tuesday', checked: false },
        { id: '2', label: 'Wednesday', checked: false },
        { id: '3', label: 'Thursday', checked: false },
        { id: '4', label: 'Friday', checked: false },
        { id: '5', label: 'Saturday', checked: false },
        { id: '6', label: 'Sunday', checked: false },
    ]);

    const [mealsCheckboxes, setMeals] = useState<CustomSelectionInput[]>([
        { id: '7', label: 'Breakfast', checked: false },
        { id: '8', label: 'Lunch', checked: false },
        { id: '9', label: 'Dinner', checked: false },
    ]);

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

    const handleDaySelection = (id: string) => {
        const daysTemp = [...daysCheckboxes];
        const prefTemp = { ...preferences };
        daysTemp.forEach((day) => {
            if (day.id === id) {
                if (!prefTemp.weekConfig.days.find((dayT) => dayT === day.label)) {
                    day.checked = true;
                    prefTemp.weekConfig.days.push(day.label);
                } else {
                    day.checked = false;
                    prefTemp.weekConfig.days = prefTemp.weekConfig.days.filter((dayT) => dayT !== day.label);
                }
            }
        });
        setDays(daysTemp);
        setPreferences(prefTemp);
    };

    const handleMealSelection = (id: string) => {
        const mealsTemp = [...mealsCheckboxes];
        const prefTemp = { ...preferences };
        mealsTemp.forEach((meal) => {
            if (meal.id === id) {
                if (!prefTemp.weekConfig.meals.find((mealT) => mealT === meal.label)) {
                    meal.checked = true;
                    prefTemp.weekConfig.meals.push(meal.label);
                } else {
                    meal.checked = false;
                    prefTemp.weekConfig.meals = prefTemp.weekConfig.meals.filter((mealT) => mealT !== meal.label);
                }
            }
        });
        setMeals(mealsTemp);
        setPreferences(prefTemp);
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
            router.push(`${router.basePath}/weekOverview`, undefined, undefined);
        }
    };

    return (
        <>
            <MobileHeader />
            <DesktopHeader />
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
                            foodLifeStyleSelected={foodLifeStyleSelected}
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
                                            weekConfig: preferences.weekConfig,
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
                                            weekConfig: preferences.weekConfig,
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
                                            weekConfig: preferences.weekConfig,
                                        });
                                    }}
                                    onBack={handleBackStep}
                                    foodDislikes={preferences.foodDislikes}
                                    onNext={handleNextStep}
                                />
                            )}
                            {currentStep === 4 && (
                                <WeekplanConfig
                                    onChoice={(weekConfig: WeekConfig) => {
                                        setPreferences({
                                            formOfDiet: preferences.formOfDiet,
                                            allergens: preferences.allergens,
                                            foodDislikes: preferences.foodDislikes,
                                            weekConfig: weekConfig,
                                        });
                                    }}
                                    onBack={handleBackStep}
                                    weekConfig={preferences.weekConfig}
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
        </>
    );
};

export default SetupParentPage;
