import styles from '@styles/Intolerances.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function IntolerancesPage() {
    const intolerances = [
        'Laktoseintoleranz',
        'Zöliakie',
        'Histaminintoleranz',
        'Sorbitintoleranz',
        'Sacharoseintoleranz',
        'Alkoholintoleranz',
    ];

    const [choices, setChoices] = useState<string[]>([]);
    const router = useRouter();

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
        const { formOfDiet } = router?.query;
        const currentIntolerances = e.currentTarget.getAttribute('data-btn') === 'skip' ? [] : choices;
        const data = {
            formOfDiet: formOfDiet,
            allergenes: [],
            foodDislikes: [],
        };

        fetch('http://localhost:3000/preferences', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok)
                    router.push({
                        pathname: '/weekOverview',
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div className="flex justify-center items-center">
            <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[20px]">
                <fieldset className="flex flex-col">
                    <h2 className="text-5xl font-semibold text-gray-custom4 mb-14">Unverträglichkeiten</h2>
                    <div className="grid grid-cols-3 gap-3 mb-6">
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
                        <Link className="font-medium text-gray-custom4" href={'/preferences'}>
                            Go Back
                        </Link>
                        <button
                            type="submit"
                            className="font-medium text-gray-custom4"
                            data-btn="skip"
                            onClick={handleClick}
                        >
                            Skip Question
                        </button>
                        <button
                            type="submit"
                            className="font-medium text-gray-custom4"
                            data-btn="next"
                            onClick={handleClick}
                        >
                            Next Step
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
