'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import WeekplanConfig from '@components/WeekplanConfig/WeekplanConfig';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import Intolerances from '@components/Intolerances/Intolerances';
import FoodLifestyle from '@components/FoodLifestyle/FoodLifestyle';
import Dislikes from '@components/Dislikes/Dislikes';
import { fetchWithAuth } from '@helpers/utils';
import { APISearchResponse, CustomSelectionInput } from 'src/types/types';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    days: number[];
    meals: number[];
    servings: number;
}

const stepNames = ['Food Lifestyle', 'Intolerances', 'Dislikes', 'Weekplan'];

const SetupParentPage = () => {
    const numberDaysOfWeek = 7;
    const { data: session } = useSession();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [foodLifeStyleSelected, setFoodLifeStyleSelected] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        formOfDiet: '',
        allergens: [],
        foodDislikes: [],
        days: [0, 1, 2, 3, 4, 5, 6],
        meals: [0, 1],
        servings: 1,
    });

    const [daysCheckboxes, setDays] = useState<CustomSelectionInput[]>([
        {
            id: '0',
            label: 'Monday',
            checked: true,
        },
        { id: '1', label: 'Tuesday', checked: true },
        { id: '2', label: 'Wednesday', checked: true },
        { id: '3', label: 'Thursday', checked: true },
        { id: '4', label: 'Friday', checked: true },
        { id: '5', label: 'Saturday', checked: true },
        { id: '6', label: 'Sunday', checked: true },
    ]);

    const [mealsCheckboxes, setMeals] = useState<CustomSelectionInput[]>([
        // { id: '7', label: 'Breakfast', checked: false },
        { id: '7', label: 'Lunch', checked: true },
        { id: '8', label: 'Dinner', checked: true },
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
        if (prefTemp.days.includes(parseInt(clickedDay?.id))) {
            clickedDay.checked = false;
            prefTemp.days = prefTemp.days.filter((dayT) => dayT !== parseInt(clickedDay.id));
        } else {
            clickedDay.checked = true;
            prefTemp.days.push(parseInt(clickedDay.id));
        }
        setDays(daysTemp);
        setPreferences(prefTemp);
    };

    const handleMealSelection = (id: string) => {
        const mealsTemp = [...mealsCheckboxes];
        const prefTemp = { ...preferences };
        const clickedMeal = mealsTemp.find((meal) => meal.id === id);
        if (!clickedMeal) return;
        if (prefTemp.meals.includes(parseInt(clickedMeal?.id) - numberDaysOfWeek)) {
            clickedMeal.checked = false;
            prefTemp.meals = prefTemp.meals.filter((mealT) => mealT !== parseInt(clickedMeal.id) - numberDaysOfWeek);
        } else {
            clickedMeal.checked = true;
            prefTemp.meals.push(parseInt(clickedMeal.id) - numberDaysOfWeek);
        }
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
                                        days: preferences.days,
                                        meals: preferences.meals,
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
                                        meals: preferences.meals,
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
                                        meals: preferences.meals,
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
                                        meals: preferences.meals,
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
