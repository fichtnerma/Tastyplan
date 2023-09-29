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
        { food: 'vegan', description: 'You dont eat any kind of animal products', icon: 'Vegan-color' },
        { food: 'vegetarian', description: 'You dont eat any meat and fish', icon: 'Vegetarisch-color' },
        { food: 'omnivore', description: 'You eat all animal products', icon: 'Omnivor-color' },
        { food: 'flexitarian', description: 'You rarely eat all animal products', icon: 'Flexitarisch-color' },
        { food: 'pescetarian', description: 'You only eat fish from all animal products', icon: 'Pescetarisch-color' },
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
        <>
            <h4 className="mb-2 h2">What is your food lifestyle?</h4>
            <div
                className="flex flex-col justify-center lg:grid lg:grid-cols-2 gap-y-4 lg:gap-x-4 w-full h-[400px] lg:h-[300px] overflow-y-auto overflow-x-hidden"
                tabIndex={-1}
            >
                {preferences.map((preference, i) => (
                    <div
                        key={preference.food}
                        className={`flex justify-end items-center w-full relative pr-5 h-[60px] lg:h-[70px] ${styles.choiceWrapper}`}
                        tabIndex={i + 1}
                    >
                        <input
                            className={`absolute top-0 right-0 bottom-0 left-0 cursor:pointer opacity=[.01] z-[-1] w-full h-full rounded-[50px] hover:cursor-pointer custom-focus ${styles.customInput}`}
                            id={preference.food}
                            type="radio"
                            name="preferences"
                            value={preference.food}
                            checked={selection === preference.food}
                            onChange={onChoiceChange}
                            data-cy={`${preference.food}-radio-btn`}
                        />
                        <label
                            htmlFor={preference.food}
                            className={`absolute top-0 right-0 bottom-0 left-0 hover:cursor-pointer flex justify-start items-center border-2 border-solid border-gray-custom4 rounded-[50px] z-[1] font-medium font-[1.125rem] leading-7 pl-8 col-start-1 ${styles.customLabel}`}
                        >
                            <p className="absolute pb-4 capitalize">{preference.food}</p>
                            <p className="text-xs pt-8">{preference.description}</p>
                        </label>
                        <div className="z-[2]">
                            <Icon size={50} icon={preference.icon}></Icon>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end relative">
                <button
                    className="btn-primary mt-6 disabled:bg-gray-custom2"
                    data-btn="next"
                    onClick={onSubmitSelection}
                    data-anchor="next"
                    disabled={disabled}
                    data-cy="next-btn"
                    tabIndex={preferences.length}
                >
                    Next
                </button>
            </div>
        </>
    );
}
