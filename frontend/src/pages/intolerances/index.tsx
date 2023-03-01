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
    ];

    const [selection, setSelection] = useState([]);

    const onAddChoice = (e: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div className="flex justify-center items-center h-90v bg-green-custom2">
            <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[42px]">
                <fieldset className="flex flex-col">
                    <h2 className="text-5xl font-semibold text-gray-custom4 mb-14">Unverträglichkeiten</h2>
                    <div className="flex flex-col items-center">
                        {intolerances.map((intolerance, i) => (
                            <div key={i} className={styles.choiceWrapper}>
                                <input type="checkbox" name="intolerances" value={intolerance} onChange={onAddChoice} />
                                <label htmlFor={intolerance}>{intolerance}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
