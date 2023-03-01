import styles from '@styles/Intolerances.module.scss';
import { useState } from 'react';

export default function IntolerancesPage() {
    const intolerances = [
        'Laktoseintoleranz',
        'Fruktoseintoleranz',
        'Zöliakie',
        'Glutenunverträglichkeit',
        'Histaminintoleranz',
        'Sorbitintoleranz',
        'Sacharoseintoleranz',
        'Alkoholintoleranz',
        'Weizensensitivität',
    ];

    const [choices, setChoices] = useState<string[]>([]);

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

    return (
        <div className="flex justify-center items-center h-90v bg-green-custom2">
            <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[42px]">
                <fieldset className="flex flex-col">
                    <h2 className="text-5xl font-semibold text-gray-custom4 mb-14">Unverträglichkeiten</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {intolerances.map((intolerance, i) => (
                            <div key={i} className={styles.intoleranceWrapper}>
                                <input
                                    type="checkbox"
                                    name="intolerances"
                                    value={intolerance}
                                    checked={choices.includes(intolerance)}
                                    onChange={onAddChoice}
                                />
                                <label htmlFor={intolerance}>{intolerance}</label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between relative">
                        <button className="font-medium text-gray-custom4">Go Back</button>
                        <button type="submit" className="font-medium text-gray-custom4">
                            Skip Question
                        </button>
                        <button type="submit" className="font-medium text-gray-custom4">
                            Next Step
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
