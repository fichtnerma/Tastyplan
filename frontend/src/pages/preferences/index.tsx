import styles from '@styles/Preferences.module.scss';

import logo from '../../../public/logo.svg';

import Image from 'next/image';

import Router from 'next/router';
import React, { useState } from 'react';

const PreferencesPage = () => {
    const preferences = [
        { food: 'omnivor', description: 'You eat all animal products' },
        { food: 'flexitarier', description: 'You rarely eat all animal products' },
        { food: 'pescetarier', description: 'You only eat fish from all animal products' },
        { food: 'vegetarisch', description: 'You dont eat any meat and fish' },
        { food: 'vegan', description: 'You dont eat any kind of animal products' },
    ];

    const [selection, setSelection] = useState('omnivor');

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
                <form className="flex justify-center py-8 px-12 w-5/6 h-full bg-white rounded-[20px]">
                    <fieldset className="flex flex-col mt-20">
                        <h4 className="mb-8">Welcher Ernährungstyp bist du?</h4>
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
                        <div className="flex justify-center relative">
                            <a
                                className="font-medium text-gray-custom4"
                                href="/preferences"
                                onClick={onSubmitSelection}
                                data-anchor="skip"
                            >
                                Überspringen
                            </a>
                            <a
                                className="absolute top-0 right-0 font-medium text-gray-custom4"
                                href="/preferences"
                                onClick={onSubmitSelection}
                                data-anchor="next"
                            >
                                Weiter
                            </a>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default PreferencesPage;
