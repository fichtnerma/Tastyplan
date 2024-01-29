import React, { useState } from 'react';
import Icon from '@components/Icon/Icon';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup';
import { CustomCheckboxInput } from 'src/types/types';
import styles from '../WeekplanConfig//WeekplanConfig.module.scss';

type OnChoiceFunction = (preferences: {
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
}) => void;
type WeekplanSettingsProps = {
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
    onChoice: OnChoiceFunction;
};

function WeekplanSettings({ days, wantsLunch, wantsDinner, servings, onChoice }: WeekplanSettingsProps) {
    const [selectedDays, setSelectedDays] = useState<string[]>(days);
    const [selectedWantsLunch, setSelectedWantsLunch] = useState<boolean>(wantsLunch);
    const [selectedWantsDinner, setSelectedWantsDinner] = useState<boolean>(wantsDinner);
    const [selectedServings, setSelectedServings] = useState<number>(servings);

    const initialDayBoxes = [
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
    ].map((box) => ({ ...box, checked: selectedDays.includes(box.value) }));

    const initialMealBoxes = [
        { id: '7', label: 'Lunch', checked: selectedWantsLunch, value: 'lunch' },
        { id: '8', label: 'Dinner', checked: selectedWantsDinner, value: 'dinner' },
    ];

    const [mealsCheckboxes, setMealsCheckboxes] = useState<CustomCheckboxInput[]>(initialMealBoxes);

    const [daysCheckboxes, setDays] = useState<CustomCheckboxInput[]>(initialDayBoxes);

    const handleDaySelection = (id: string) => {
        const daysTemp = [...daysCheckboxes];
        let prefTemp = [...selectedDays];
        const clickedDay = daysTemp.find((day) => day.id === id);
        if (!clickedDay) return;
        if (prefTemp.includes(clickedDay.value)) {
            clickedDay.checked = false;
            prefTemp = prefTemp.filter((dayT) => dayT !== clickedDay.value);
        } else {
            clickedDay.checked = true;
            prefTemp.push(clickedDay.value);
        }
        setSelectedDays(prefTemp);
        setDays(daysTemp);
        onChoice({
            days: prefTemp,
            wantsLunch: selectedWantsLunch,
            wantsDinner: selectedWantsDinner,
            servings: selectedServings,
        });
    };

    const handleMealSelection = (id: string, value: string, checked: boolean) => {
        // hier ist das Problem, dass checked verkehrt ist. Also wenn die Box gecheckt ist, ist checked false und umgekehrt.
        const mealsCheckboxesTemp = [...mealsCheckboxes];
        const foundMealCheckbox = mealsCheckboxesTemp.find((el) => el.value === value);
        if (foundMealCheckbox) {
            if (checked && value === 'lunch') {
                setSelectedWantsLunch(true);
                foundMealCheckbox.checked = true;
                onChoice({
                    days: selectedDays,
                    wantsLunch: true,
                    wantsDinner: selectedWantsDinner,
                    servings: selectedServings,
                });
            }
            if (checked && value === 'dinner') {
                setSelectedWantsDinner(true);
                foundMealCheckbox.checked = true;
                onChoice({
                    days: selectedDays,
                    wantsLunch: selectedWantsLunch,
                    wantsDinner: true,
                    servings: selectedServings,
                });
            }
            if (!checked && value === 'lunch') {
                setSelectedWantsLunch(false);
                foundMealCheckbox.checked = false;
                onChoice({
                    days: selectedDays,
                    wantsLunch: false,
                    wantsDinner: selectedWantsDinner,
                    servings: selectedServings,
                });
            }
            if (!checked && value === 'dinner') {
                setSelectedWantsDinner(false);
                foundMealCheckbox.checked = false;
                onChoice({
                    days: selectedDays,
                    wantsLunch: selectedWantsLunch,
                    wantsDinner: false,
                    servings: selectedServings,
                });
            }
        }
        setMealsCheckboxes(mealsCheckboxesTemp);
    };

    const increasePortion = () => {
        const servingsNew = servings + 1;
        setSelectedServings(selectedServings + 1);
        onChoice({
            days: selectedDays,
            wantsLunch: selectedWantsLunch,
            wantsDinner: selectedWantsDinner,
            servings: servingsNew,
        });
    };

    const decreasePortion = () => {
        if (servings > 1) {
            const servingsNew = servings - 1;
            setSelectedServings(servingsNew);
            onChoice({
                days: selectedDays,
                wantsLunch: selectedWantsLunch,
                wantsDinner: selectedWantsDinner,
                servings: servingsNew,
            });
        }
    };
    return (
        <div className="lg:pt-6">
            <h5 className="mb-3">On what days do you want to cook?</h5>
            <div className="lg:pl-8 pb-4">
                <CheckboxGroup
                    checkboxes={daysCheckboxes}
                    groupName="days"
                    onCheckboxSelect={handleDaySelection}
                    disabled={false}
                />
            </div>
            <h5 className="mb-3">What meals do you want to cook?</h5>
            <div className="lg:pl-8 pb-4">
                <CheckboxGroup
                    checkboxes={mealsCheckboxes}
                    groupName="meals"
                    onCheckboxSelect={handleMealSelection}
                    disabled={false}
                />
            </div>
            <h5 className="lg:mt-0l mb-3">How many servings?</h5>
            <div className="flex lg:pl-8">
                <button
                    type="button"
                    className={`btn-primary !flex justify-center items-center  ${styles.btnPortion}`}
                    onClick={decreasePortion}
                    data-cy="decrease-serving-btn"
                >
                    <Icon icon="minus" size={19} />
                </button>
                <p id="portion" data-cy="portion-amount" className="text-base w-10 text-center">
                    {selectedServings}
                </p>
                <button
                    type="button"
                    className={`btn-primary !flex justify-center items-center  ${styles.btnPortion} mr-5`}
                    onClick={increasePortion}
                    data-cy="increase-serving-btn"
                >
                    <Icon icon="plus" size={19} />
                </button>
            </div>
        </div>
    );
}

export default WeekplanSettings;
