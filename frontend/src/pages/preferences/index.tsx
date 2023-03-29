import styles from '@styles/Preferences.module.scss';

import logo from '../../../public/logo.svg';

import Image from 'next/image';

import Router from 'next/router';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const PreferencesPage = () => {
    const preferences = [
        { food: 'omnivore', description: 'You eat all animal products' },
        { food: 'flexitarian', description: 'You rarely eat all animal products' },
        { food: 'pescetarian', description: 'You only eat fish from all animal products' },
        { food: 'vegetarian', description: 'You dont eat any meat and fish' },
        { food: 'vegan', description: 'You dont eat any kind of animal products' },
    ];

    const { data: session, status } = useSession();

    console.log(session?.user);

    const [selection, setSelection] = useState('omnivore');

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(e.target.value);
    };

    const onSubmitSelection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const clickedAnchor = e.currentTarget.getAttribute('data-anchor');
        const currentSelection = clickedAnchor === 'skip' ? 'omnivore' : selection;

        Router.push({
            pathname: '/intolerances',
            query: {
                formOfDiet: currentSelection,
            },
        });
    };

    return (
        <div>
            <Image src={logo} className="ml-24 mb-8" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <form className="flex justify-center py-8 px-12 h-70v w-5/6 bg-white rounded-[20px]">
                    <fieldset className="flex flex-col w-4/5 mt-24 ">
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
                        <div className="flex justify-center relative my-8">
                            <a
                                className="btn-primary absolute top-0 right-0 font-medium text-gray-custom4"
                                href="/preferences"
                                onClick={onSubmitSelection}
                                data-anchor="next"
                            >
                                Next
                            </a>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default PreferencesPage;
