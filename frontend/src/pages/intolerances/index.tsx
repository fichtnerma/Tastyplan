import styles from '@styles/Intolerances.module.scss';

import logo from '../../../public/logo.svg';
import peanut from '../../../public/Icons/Erdnuss_Icon.svg';
import hazelnut from '../../../public/Icons/Haselnuss_Icon.svg';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function IntolerancesPage() {
    const intolerances = [
        { ui: 'Peanuts', code: 'peanut', icon: peanut },
        { ui: 'Hazelnuts', code: 'hazelnut', icon: hazelnut },
        { ui: 'Walnuts', code: 'walnut', icon: peanut },
        { ui: 'Other Nuts', code: 'shellFruit', icon: peanut },
        { ui: 'Lactose', code: 'milk', icon: hazelnut },
        { ui: 'Gluten', code: 'gluten', icon: peanut },
        { ui: 'Eggs', code: 'egg', icon: hazelnut },
        { ui: 'Shellfish', code: 'crustacaen', icon: peanut },
        { ui: 'Fish', code: 'fish', icon: hazelnut },
        { ui: 'Soy', code: 'soy', icon: hazelnut },
        { ui: 'Celery', code: 'celery', icon: peanut },
        { ui: 'Mustard', code: 'mustard', icon: peanut },
        { ui: 'Sesame', code: 'sesame', icon: peanut },
        { ui: 'Sulfur Dioxide', code: 'sulfur', icon: hazelnut },
        { ui: 'Lupine', code: 'lupine', icon: peanut },
        { ui: 'Mollusk', code: 'mollusk', icon: hazelnut },
    ];

    const [choices, setChoices] = useState<string[]>([]);
    const router = useRouter();

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        console.log(choices);
    }, [choices]);

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
        // const currentIntolerances = e.currentTarget.getAttribute('data-btn') === 'skip' ? [] : choices;
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
        <div>
            <Image src={logo} className="ml-24 mb-8" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <form className="flex justify-center py-8 px-12 h-70v w-5/6 bg-white rounded-[20px]">
                    <fieldset className="flex flex-col w-4/5 mt-24">
                        <h4 className="mb-8">What are your intolerances?</h4>
                        <div className="overflow-y-auto">
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                {intolerances.map((intolerance, i) => (
                                    <div key={i} className={styles.intoleranceWrapper}>
                                        <div className={styles.containerField}>
                                            <input
                                                type="checkbox"
                                                name="intolerances"
                                                value={intolerance.code}
                                                checked={choices.includes(intolerance.code)}
                                                onChange={onAddChoice}
                                            />

                                            <label htmlFor={intolerance.ui}>
                                                <p>{intolerance.ui}</p>
                                            </label>
                                            <Image
                                                src={intolerance.icon}
                                                className="absolute z-[91]"
                                                alt="icon"
                                                width={70}
                                                priority
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between relative">
                            <Link className="btn-primary mt-4" href={'/preferences'}>
                                Back
                            </Link>
                            <button type="submit" className="btn-primary mt-4" data-btn="next" onClick={handleClick}>
                                Next
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
