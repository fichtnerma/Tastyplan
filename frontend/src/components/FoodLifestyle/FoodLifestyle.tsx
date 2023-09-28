import React, { useState } from 'react';
import Icon from '@components/Icon/Icon';
import styles from '../FoodLifestyle/FoodLifestyle.module.scss';

type OnNextFunction = () => void;
type OnChoiceFunction = (choice: string) => void;
interface FoodLifestyleProps {
    onNext: OnNextFunction;
    onChoice: OnChoiceFunction;
    formOfDiet: string;
}
export default function FoodLifestyle({ onNext, onChoice, formOfDiet }: FoodLifestyleProps) {
    const preferences = [
        { id: 1, food: 'vegan', description: 'You dont eat any kind of animal products', icon: 'Vegan-color' },
        { id: 2, food: 'vegetarian', description: 'You dont eat any meat and fish', icon: 'Vegetarisch-color' },
        { id: 3, food: 'omnivore', description: 'You eat all animal products', icon: 'Omnivor-color' },
        { id: 4, food: 'flexitarian', description: 'You rarely eat all animal products', icon: 'Flexitarisch-color' },
        {
            id: 5,
            food: 'pescetarian',
            description: 'You only eat fish from all animal products',
            icon: 'Pescetarisch-color',
        },
    ];

    const [selection, setSelection] = useState(formOfDiet);
    const [disabled, setDisabled] = useState(selection ? false : true);

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setSelection(targetValue);
        onChoice(targetValue);
        setDisabled(false);
        onNext();
    };

    const onSubmitSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div>
            <h4 className="mb-2 h2">What is your food lifestyle?</h4>
            <div className="flex justify-center h-[400px] lg:h-[300px] overflow-y-auto overflow-x-hidden">
                <div
                    className="grid grid-flow-row items-center w-full lg:grid-cols-2 lg:gap-x-4 lg:gap-y-5 lg:justify-items-center"
                    tabIndex={-1}
                >
                    {preferences.map((preference, i) => (
                        <div
                            key={preference.id}
                            className={`lg:m-0 h-[60px] lg:h-[75px] xl:h-[70px] ${styles.choiceWrapper} ${styles.customFocus}`}
                            tabIndex={i + 1}
                        >
                            <input
                                className={`absolute top-0 right-0 bottom-0 left-0 cursor-pointer z-[1] opacity-[.01] z-[100] w-full h-full rounded-[50px] ${styles.customFocus} ${styles.radioBtn}`}
                                type="radio"
                                name="preferences"
                                value={preference.food}
                                checked={selection === preference.food}
                                onChange={onChoiceChange}
                                data-cy={`${preference.food}-radio-btn`}
                            />
                            <label
                                htmlFor={preference.food}
                                className={`absolute top-0 right-0 bottom-0 left-0 cursor-pointer z-[1] flex justify-left items-center border-2 border-solid border-gray-custom4 rounded-[50px] z-[90] font-medium text-[1.124rem] leading-8 pl-8 col-start-1 ${styles.customFocus} ${styles.radioLabel}`}
                            >
                                <p className="absolute top-1 capitalize">{preference.food}</p>
                                <p className="text-xs pt-6 lg:pt-8 lg:max-w-[200px] xl:max-w-[unset]">
                                    {preference.description}
                                </p>
                            </label>
                            <div className="flex self-center col-start-6 h-fit z-[90] center pr-4">
                                <Icon size={50} icon={preference.icon}></Icon>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end relative">
                <button
                    tabIndex={5}
                    className="btn-primary mt-6 disabled:bg-gray-custom2"
                    data-btn="next"
                    onClick={onSubmitSelection}
                    data-anchor="next"
                    disabled={disabled}
                    data-cy="next-btn"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
