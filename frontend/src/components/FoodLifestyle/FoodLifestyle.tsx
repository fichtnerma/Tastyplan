import styles from '../FoodLifestyle/FoodLifestyle.module.scss';

import Router from 'next/router';
import React, { useEffect, useState } from 'react';

type OnNextFunction = () => void;
type OnChoiceFunction = (choice: any) => any;
interface FoodLifestyleProps {
    onNext: OnNextFunction;
    onChoice: OnChoiceFunction;
}
export default function FoodLifestyle({ onNext, onChoice }: FoodLifestyleProps) {
    const preferences = [
        { food: 'omnivore', description: 'You eat all animal products' },
        { food: 'flexitarian', description: 'You rarely eat all animal products' },
        { food: 'pescetarian', description: 'You only eat fish from all animal products' },
        { food: 'vegetarian', description: 'You dont eat any meat and fish' },
        { food: 'vegan', description: 'You dont eat any kind of animal products' },
    ];

    const [selection, setSelection] = useState('');

    useEffect(() => {
        console.log(selection);
    }, [selection]);

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(e.target.value);
    };

    const onSubmitSelection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const currentSelection = selection;

        onNext();
        onChoice((preferences: any) => ({ ...preferences, formOfDiet: currentSelection }));
    };

    return (
        <div>
            <h4 className="mb-8">What is your food lifestyle?</h4>
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
                            />
                            <label htmlFor={preference.food}>
                                <p className="absolute min-w-full pb-4 pl-6">{preference.food}</p>
                                <p className="text-xs min-w-full pt-8">{preference.description}</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="flex justify-center relative my-8">
                <a
                    className="btn-primary absolute top-0 right-0 font-medium text-gray-custom4"
                    href="/preferences"
                    onClick={onSubmitSelection}
                    data-anchor="next"
                >
                    Next
                </a>
            </div> */}
            <div className="flex justify-end relative">
                <button
                    type="submit"
                    className="btn-primary mt-10"
                    data-btn="next"
                    onClick={onSubmitSelection}
                    data-anchor="next"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
