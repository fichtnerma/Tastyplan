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
    };

    const onSubmitSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div>
            <h4 className="mb-2">What is your food lifestyle?</h4>
            <div className={styles.scrolling}>
                <div className={styles.preferencesWrapper}>
                    {preferences.map((preference, i) => (
                        <div key={i} className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value={preference.food}
                                checked={selection === preference.food}
                                onChange={onChoiceChange}
                                data-cy={`${preference.food}-radio-btn`}
                            />
                            <label htmlFor={preference.food}>
                                <p className="absolute pb-4 capitalize">{preference.food}</p>
                                <p className="text-xs pt-8">{preference.description}</p>
                            </label>
                            <div className="absolute right-0 pr-8 pt-2 z-[90]">
                                <Icon size={60} icon={preference.icon}></Icon>
                            </div>
                        </div>
                    ))}
                </div>
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
        </div>
    );
}
