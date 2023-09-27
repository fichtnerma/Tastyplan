import { useState } from 'react';
import Icon from '@components/Icon/Icon';
import styles from '../Intolerances/Intolerances.module.scss';

type OnNextFunction = () => void;
type OnBackFunction = () => void;
type OnChoiceFunction = (choices: string[]) => void;

interface IntolerancesProps {
    onNext: OnNextFunction;
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    allergens: string[];
}

export default function Intolerances({ onNext, onBack, onChoice, allergens }: IntolerancesProps) {
    const intolerances = [
        { id: 1, ui: 'Peanuts', code: 'peanut', icon: 'Erdnuss' },
        { id: 2, ui: 'Hazelnuts', code: 'hazelnut', icon: 'Haselnuss' },
        { id: 3, ui: 'Walnuts', code: 'walnut', icon: 'Wallnuss' },
        { id: 4, ui: 'Other Nuts', code: 'shellFruit', icon: 'Nüsse' },
        { id: 5, ui: 'Lactose', code: 'milk', icon: 'laktose' },
        { id: 6, ui: 'Gluten', code: 'gluten', icon: 'Weizen' },
        { id: 7, ui: 'Eggs', code: 'egg', icon: 'Ei' },
        { id: 8, ui: 'Shellfish', code: 'crustacaen', icon: 'Shrimp' },
        { id: 9, ui: 'Fish', code: 'fish', icon: 'fisch' },
        { id: 10, ui: 'Soy', code: 'soy', icon: 'Soja' },
        { id: 11, ui: 'Celery', code: 'celery', icon: 'Sellerie' },
        { id: 12, ui: 'Mustard', code: 'mustard', icon: 'Senfglas' },
        { id: 13, ui: 'Sesame', code: 'sesame', icon: 'Sesam' },
        { id: 14, ui: 'Sulfur Dioxide', code: 'sulfur', icon: 'Wein' },
        { id: 15, ui: 'Lupine', code: 'lupine', icon: 'Lupinen' },
        { id: 16, ui: 'Mollusk', code: 'mollusk', icon: 'Weichtiere' },
    ];

    const [allergeneChoices, setAllergeneChoices] = useState(allergens);

    const onAddChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentSelection = allergeneChoices.length > 0 ? [...allergeneChoices] : [];

        if (currentSelection?.includes(e.target.value)) {
            const cleanSelection = currentSelection.filter((el) => el !== e.target.value);
            setAllergeneChoices(cleanSelection);
            onChoice(cleanSelection);
        } else {
            currentSelection.push(e.target.value);
            setAllergeneChoices(currentSelection);
            onChoice(currentSelection);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget.getAttribute('data-btn') == 'next') {
            onNext();
        } else {
            onBack();
        }
    };

    return (
        <>
            <h4 className="mb-2 h2">What are your intolerances?</h4>
            <div className="h-[400px] lg:h-[300px] overflow-y-auto overflow-x-hidden">
                <div className="grid grid-cols-2 gap-4 lg:gap-y-4 lg:grid-cols-3 xl:gap-y-8 xl:grid-cols-3 2xl:gap-y-8 2xl:grid-cols-4">
                    {intolerances.map((intolerance, i) => (
                        <div
                            key={intolerance.id}
                            className={`${styles.intoleranceWrapper} lg:w-[180px] xl:w-[190px] 2xl:w-[200px]`}
                            tabIndex={-1}
                        >
                            <div className={`flex ${styles.intoleranceCustomFocus}`} tabIndex={i + 1}>
                                <input
                                    type="checkbox"
                                    name="intolerances"
                                    value={intolerance.code}
                                    checked={allergeneChoices.includes(intolerance.code)}
                                    onChange={onAddChoice}
                                    data-cy={`${intolerance.code}-checkbox`}
                                />
                                <label htmlFor={intolerance.ui}>
                                    <p className="text-base">{intolerance.ui}</p>
                                </label>
                                <div
                                    className="flex self-center h-fit center pl-4 absolute z-[1]"
                                    style={{
                                        color: allergeneChoices.find((entry) => entry == intolerance.code)
                                            ? 'var(--white)'
                                            : 'var(--black)',
                                    }}
                                >
                                    <Icon size={30} icon={intolerance.icon}></Icon>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between relative">
                <button
                    type="submit"
                    className="btn-primary-unobtrusive mt-6"
                    data-btn="back"
                    onClick={handleClick}
                    tabIndex={intolerances.length + 1}
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="btn-primary mt-6"
                    data-btn="next"
                    onClick={handleClick}
                    data-cy="next-btn"
                    tabIndex={intolerances.length + 2}
                >
                    Next
                </button>
            </div>
        </>
    );
}
