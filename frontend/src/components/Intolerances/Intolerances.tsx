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
        { ui: 'Peanuts', code: 'peanut', icon: 'Erdnuss' },
        { ui: 'Hazelnuts', code: 'hazelnut', icon: 'Haselnuss' },
        { ui: 'Walnuts', code: 'walnut', icon: 'Wallnuss' },
        { ui: 'Other Nuts', code: 'shellFruit', icon: 'Nüsse' },
        { ui: 'Lactose', code: 'milk', icon: 'laktose' },
        { ui: 'Gluten', code: 'gluten', icon: 'Weizen' },
        { ui: 'Eggs', code: 'egg', icon: 'Ei' },
        { ui: 'Shellfish', code: 'crustacaen', icon: 'Shrimp' },
        { ui: 'Fish', code: 'fish', icon: 'fisch' },
        { ui: 'Soy', code: 'soy', icon: 'Soja' },
        { ui: 'Celery', code: 'celery', icon: 'Sellerie' },
        { ui: 'Mustard', code: 'mustard', icon: 'Senfglas' },
        { ui: 'Sesame', code: 'sesame', icon: 'Sesam' },
        { ui: 'Sulfur Dioxide', code: 'sulfur', icon: 'Wein' },
        { ui: 'Lupine', code: 'lupine', icon: 'Lupinen' },
        { ui: 'Mollusk', code: 'mollusk', icon: 'Weichtiere' },
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
            <div className="h-[300px] overflow-y-auto">
                <div className="grid grid-cols-1 gap-y-1 md:gap-y-2 md:grid-cols-1 lg:gap-y-4 lg:grid-cols-2 xl:gap-y-8 xl:grid-cols-3 2xl:gap-y-8 2xl:grid-cols-4">
                    {intolerances.map((intolerance, i) => (
                        <div
                            key={i}
                            className={`${styles.intoleranceWrapper} lg:w-[220px] xl:w-[190px] 2xl:w-[200px] `}
                        >
                            <div className={styles.containerField}>
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
                                    className="absolute z-[1] top-4 left-4"
                                    style={{
                                        color: allergeneChoices.find((entry) => entry == intolerance.code)
                                            ? 'var(--white)'
                                            : 'var(--black)',
                                    }}
                                >
                                    <Icon size={40} icon={intolerance.icon}></Icon>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary mt-6" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                <button
                    type="submit"
                    className="btn-primary mt-6"
                    data-btn="next"
                    onClick={handleClick}
                    data-cy="next-btn"
                >
                    Next
                </button>
            </div>
        </>
    );
}
