import styles from '../Intolerances/Intolerances.module.scss';

import peanut from '../../../public/Icons/Erdnuss.svg';
import egg from '../../../public/Icons/Ei.svg';
import fish from '../../../public/Icons/Fisch.svg';
import laktose from '../../../public/Icons/Milch_Käse.svg';
import shellfish from '../../../public/Icons/Shrimp.svg';
import soy from '../../../public/Icons/Soja.svg';
import walnut from '../../../public/Icons/Wallnuss.svg';
import gluten from '../../../public/Icons/Weizen.svg';
import hazelnut from '../../../public/Icons/Haselnuss.svg';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type OnNextFunction = () => void;
type OnBackFunction = () => void;
type OnChoiceFunction = (choice: any) => any;

interface IntolerancesProps {
    onNext: OnNextFunction;
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    allergens: string[];
}

export default function Intolerances({ onNext, onBack, onChoice, allergens }: IntolerancesProps) {
    const intolerances = [
        { ui: 'Peanuts', code: 'peanut', icon: peanut },
        { ui: 'Hazelnuts', code: 'hazelnut', icon: hazelnut },
        { ui: 'Walnuts', code: 'walnut', icon: walnut },
        { ui: 'Other Nuts', code: 'shellFruit', icon: hazelnut },
        { ui: 'Lactose', code: 'milk', icon: laktose },
        { ui: 'Gluten', code: 'gluten', icon: gluten },
        { ui: 'Eggs', code: 'egg', icon: egg },
        { ui: 'Shellfish', code: 'crustacaen', icon: shellfish },
        { ui: 'Fish', code: 'fish', icon: fish },
        { ui: 'Soy', code: 'soy', icon: soy },
        { ui: 'Celery', code: 'celery', icon: hazelnut },
        { ui: 'Mustard', code: 'mustard', icon: hazelnut },
        { ui: 'Sesame', code: 'sesame', icon: hazelnut },
        { ui: 'Sulfur Dioxide', code: 'sulfur', icon: hazelnut },
        { ui: 'Lupine', code: 'lupine', icon: hazelnut },
        { ui: 'Mollusk', code: 'mollusk', icon: hazelnut },
    ];

    const [choices, setChoices] = useState(allergens);

    useEffect(() => {}, [choices]);

    const onAddChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentSelection = [...choices];
        if (currentSelection.includes(e.target.value)) {
            const cleanSelection = currentSelection.filter((el) => el !== e.target.value);
            setChoices([...cleanSelection]);
        } else {
            currentSelection.push(e.target.value);
            setChoices([...currentSelection]);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (e.currentTarget.getAttribute('data-btn') == 'next') {
            onNext();
        } else {
            onBack();
        }

        onChoice((preferences: any) => ({ ...preferences, allergens: choices }));
    };

    return (
        <>
            <h4 className="mb-8">What are your intolerances?</h4>
            <div className="h-[300px] overflow-y-auto">
                <div className="grid grid-cols-5 gap-4 mb-4">
                    {intolerances.map((intolerance, i) => (
                        <div key={i} className={styles.intoleranceWrapper}>
                            <div className={styles.containerField}>
                                <span className="flex justify-between">
                                    <input
                                        type="checkbox"
                                        name="intolerances"
                                        value={intolerance.code}
                                        checked={choices.includes(intolerance.code)}
                                        onChange={onAddChoice}
                                    />

                                    <label htmlFor={intolerance.ui}>
                                        <p className="text-base">{intolerance.ui}</p>
                                    </label>
                                    <Image
                                        src={intolerance.icon}
                                        className="absolute z-[91] top-1"
                                        alt="icon"
                                        width={60}
                                        priority
                                    />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary mt-10" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                {/* <Link className="btn-primary mt-10" href={'/preferences'}>
                    Back
                </Link> */}
                <button type="submit" className="btn-primary mt-10" data-btn="next" onClick={handleClick}>
                    Next
                </button>
            </div>
        </>
    );
}
