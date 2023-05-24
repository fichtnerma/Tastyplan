import React, { useState } from 'react';
import Link from 'next/link';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
import { CustomSelectionInput } from 'src/types/types';
import styles from './WeekplanConfig.module.scss';

type OnBackFunction = () => void;
type OnChoiceFunction = (choices: WeekConfig) => void;
type OnDaySelectionFunction = (id: string) => void;
type OnMealSelectionFunction = (id: string) => void;

interface WeekplanConfigProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    weekConfig: WeekConfig;
    handlePreferences: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
    daysCheckboxes: CustomSelectionInput[];
    handleDaySelection: OnDaySelectionFunction;
    mealsCheckboxes: CustomSelectionInput[];
    handleMealSelection: OnMealSelectionFunction;
}

interface WeekConfig {
    days: string[];
    meals: string[];
    servings: number;
}

export default function WeekplanConfig({
    onBack,
    onChoice,
    weekConfig,
    handlePreferences,
    daysCheckboxes,
    handleDaySelection,
    mealsCheckboxes,
    handleMealSelection,
}: WeekplanConfigProps) {
    const [weekplanChoices, setWeekplanChoices] = useState({
        ...weekConfig,
        days: [...weekConfig.days],
        meals: [...weekConfig.meals],
    });

    const handleBack = () => {
        onChoice(weekplanChoices);
        onBack();
    };

    const increasePortion = () => {
        const tempServings = weekplanChoices.servings + 1;
        setWeekplanChoices({ ...weekplanChoices, servings: tempServings });
        onChoice(weekplanChoices);
    };

    const decreasePortion = () => {
        if (weekplanChoices.servings > 1) {
            const tempServings = weekplanChoices.servings - 1;
            setWeekplanChoices({ ...weekplanChoices, servings: tempServings });
            onChoice(weekplanChoices);
        }
    };

    return (
        <>
            <h4 className="mb-2">Adjust your weekplan</h4>
            <div className="h-[300px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <h5>On what days do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={daysCheckboxes}
                        groupName="days"
                        onCheckboxSelect={handleDaySelection}
                        disabled={false}
                    />
                </div>
                <div className="ml-0 lg:ml-4">
                    <h5 className="mt-8 lg:mt-0">What meals do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={mealsCheckboxes}
                        groupName="meals"
                        onCheckboxSelect={handleMealSelection}
                        disabled={false}
                    />
                    <h5 className="mt-8">How many servings?</h5>
                    <div className="flex mb-5">
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion} mr-2`}
                            onClick={decreasePortion}
                            data-cy="btn-increase-serving"
                        >
                            -
                        </button>
                        <p id="portion">{weekplanChoices.servings}</p>
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion} ml-2 mr-5`}
                            onClick={increasePortion}
                            data-cy="btn-decrease-serving"
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
                <Link
                    className="btn-primary mt-6"
                    onClick={handlePreferences}
                    href={'/weekOverview'}
                    data-cy="create-weekplan-btn"
                >
                    Create Weekplan
                </Link>
            </div>
        </>
    );
}
