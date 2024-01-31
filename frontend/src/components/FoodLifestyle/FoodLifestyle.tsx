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

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLElement>) => {
        if ('key' in e && e.key === 'Tab') return;
        const target = e.target as HTMLInputElement;
        let targetValue = target.value;

        if (!targetValue) {
            const targetElement = e.target as HTMLElement;
            targetValue = targetElement.getAttribute('data-value') as string;
        }

        console.log(targetValue);

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
            <div className="grid grid-col-1 items-center lg:grid-cols-2 gap-y-4 lg:gap-y-0 lg:gap-x-4 w-full h-[400px] lg:h-[300px] overflow-y-auto overflow-x-hidden">
                {preferences.map((preference) => (
                    <div
                        key={preference.food}
                        className={`flex justify-end items-center w-full relative pr-5 h-[60px] lg:h-[80px] xl:h-[70px] ${styles.choiceWrapper}`}
                        tabIndex={0}
                        onKeyDown={onChoiceChange}
                        data-value={preference.food}
                    >
                        <input
                            className={`absolute top-0 right-0 bottom-0 left-0 cursor:pointer w-full h-full rounded-[50px] hover:cursor-pointer custom-focus ${styles.customInput}`}
                            id={preference.food}
                            type="radio"
                            name="preferences"
                            value={preference.food}
                            checked={selection === preference.food}
                            onChange={onChoiceChange}
                            data-cy={`${preference.food}-radio-btn`}
                            tabIndex={-1}
                        />
                        <label
                            htmlFor={preference.food}
                            className={`absolute top-0 right-0 bottom-0 left-0 hover:cursor-pointer flex flex-col items-start justify-center border-2 border-solid bg-white-custom border-green-custom1 rounded-[50px] z-[1] font-medium text-[1.13rem] leading-7 pl-8 col-start-1 ${styles.customLabel}`}
                        >
                            <p className="capitalize">{preference.food}</p>
                            <p className="text-xs lg:max-w-[170px] xl:max-w-[unset]">{preference.description}</p>
                        </label>
                        <div className="pointer-events-none z-[2]">
                            <Icon size={50} icon={preference.icon} />
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
                >
                    Next
                </button>
            </div>
        </>
    );
}
