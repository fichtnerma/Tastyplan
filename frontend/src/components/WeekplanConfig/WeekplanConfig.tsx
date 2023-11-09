import React from 'react';
import Link from 'next/link';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
import { CustomCheckboxInput } from 'src/types/types';
import styles from './WeekplanConfig.module.scss';

type OnBackFunction = () => void;
type OnChoiceFunction = (servings: number) => void;
type OnDaySelectionFunction = (id: string) => void;
type OnMealSelectionFunction = (value: string) => void;

interface WeekplanConfigProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    servings: number;
    handlePreferences: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
    daysCheckboxes: CustomCheckboxInput[];
    handleDaySelection: OnDaySelectionFunction;
    mealsCheckboxes: CustomCheckboxInput[];
    handleMealSelection: OnMealSelectionFunction;
}

export default function WeekplanConfig({
    onBack,
    onChoice,
    servings,
    handlePreferences,
    daysCheckboxes,
    handleDaySelection,
    mealsCheckboxes,
    handleMealSelection,
}: WeekplanConfigProps) {
    const handleBack = () => {
        onChoice(servings);
        onBack();
    };

    const increasePortion = () => {
        onChoice(servings + 1);
    };

    const decreasePortion = () => {
        if (servings > 1) {
            onChoice(servings - 1);
        }
    };

    return (
        <>
            <h4 className="!mb-2 h2">Adjust your weekplan</h4>
            <div className="h-[400px] lg:h-[300px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <h5 className="mb-2">On what days do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={daysCheckboxes}
                        groupName="days"
                        onCheckboxSelect={handleDaySelection}
                        disabled={false}
                    />
                </div>
                <div className="ml-0 lg:ml-4">
                    <h5 className="mt-8 lg:mt-0 mb-2">What meals do you want to cook?</h5>
                    <CheckboxGroup
                        checkboxes={mealsCheckboxes}
                        groupName="meals"
                        onCheckboxSelect={handleMealSelection}
                        disabled={false}
                    />
                    <h5 className="mt-8 lg:mt-4 mb-2">How many servings?</h5>
                    <div className="flex mb-5">
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion}`}
                            onClick={decreasePortion}
                            data-cy="decrease-serving-btn"
                        >
                            -
                        </button>
                        <p id="portion" data-cy="portion-amount" className="text-base w-10 text-center">
                            {servings}
                        </p>
                        <button
                            type="button"
                            className={`btn-primary ${styles.btnPortion} mr-5`}
                            onClick={increasePortion}
                            data-cy="increase-serving-btn"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary-unobtrusive mt-6" data-btn="back" onClick={handleBack}>
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
