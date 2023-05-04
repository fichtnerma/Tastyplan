import React, { useState } from 'react';
import Link from 'next/link';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
import styles from './WeekplanConfig.module.scss';

type OnBackFunction = () => void;
type OnChoiceFunction = (choices: WeekConfig) => void;

interface WeekplanConfigProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    weekConfig: WeekConfig;
    handlePreferences: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface WeekConfig {
    days: string[];
    meals: string[];
    servings: number;
}

export default function WeekplanConfig({ onBack, onChoice, weekConfig, handlePreferences }: WeekplanConfigProps) {
    const [weekplanChoices, setWeekplanChoices] = useState({
        ...weekConfig,
        days: [...weekConfig.days],
        meals: [...weekConfig.meals],
    });

    const days = [
        { id: '0', label: 'Monday', checked: false },
        { id: '1', label: 'Tuesday', checked: false },
        { id: '2', label: 'Wednesday', checked: false },
        { id: '3', label: 'Thursday', checked: false },
        { id: '4', label: 'Friday', checked: false },
        { id: '5', label: 'Saturday', checked: false },
        { id: '6', label: 'Sunday', checked: false },
    ];

    const meals = [
        { id: '7', label: 'Breakfast', checked: false },
        { id: '8', label: 'Lunch', checked: false },
        { id: '9', label: 'Dinner', checked: false },
    ];

    const handleBack = () => {
        onChoice(weekplanChoices);
        onBack();
    };

    const handleDaySelect = (id: string) => {
        const clickedDay = days.find((day) => day.id === id);
        if (clickedDay) {
            if (!weekConfig.days.find((day) => day === clickedDay.label)) {
                weekConfig.days.push(clickedDay.label);
                setWeekplanChoices(weekConfig);
                clickedDay.checked = true;
            } else {
                const newDays = weekConfig.days.filter((day) => day === clickedDay.label);
                weekConfig.days = newDays;
                setWeekplanChoices(weekConfig);
                clickedDay.checked = false;
            }
        }
    };

    const handleMealSelect = (id: string) => {
        const clickedMeal = meals.find((meal) => meal.id === id);
        if (clickedMeal) {
            if (!weekConfig.meals.find((meal) => meal === clickedMeal.label)) {
                weekConfig.meals.push(clickedMeal.label);
                setWeekplanChoices(weekConfig);
                clickedMeal.checked = true;
            } else {
                const newMeals = weekConfig.meals.filter((meal) => meal === clickedMeal.label);
                weekConfig.meals = newMeals;
                setWeekplanChoices(weekConfig);
                clickedMeal.checked = false;
            }
        }
    };

    const increasePortion = () => {
        const tempServings = weekplanChoices.servings + 1;
        setWeekplanChoices({ ...weekplanChoices, servings: tempServings });
    };

    const decreasePortion = () => {
        if (weekplanChoices.servings > 1) {
            const tempServings = weekplanChoices.servings - 1;
            setWeekplanChoices({ ...weekplanChoices, servings: tempServings });
        }
    };

    return (
        <>
            <h4 className="mb-2">Adjust your weekplan</h4>
            <div className="h-[300px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <h5>On what days do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={days}
                        groupName="days"
                        onCheckboxSelect={handleDaySelect}
                        disabled={false}
                    />
                </div>
                <div className="ml-0 lg:ml-4">
                    <h5 className="mt-8 lg:mt-0">What meals do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={meals}
                        groupName="meals"
                        onCheckboxSelect={handleMealSelect}
                        disabled={false}
                    />
                    <h5 className="mt-8">How many servings?</h5>
                    <div className="flex mb-5">
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion} mr-2`}
                            onClick={decreasePortion}
                        >
                            -
                        </button>
                        <p id="portion">{weekplanChoices.servings}</p>
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion} ml-2 mr-5`}
                            onClick={increasePortion}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary mt-6" data-btn="back" onClick={handleBack}>
                    Back
                </button>
                <Link className="btn-primary mt-6" onClick={handlePreferences} href={'/weekOverview'}>
                    Create Weekplan
                </Link>
            </div>
        </>
    );
}
