import styles from '@styles/Preferences.module.scss';

import logo from '../../../public/logo.svg';

import Image from 'next/image';

import Router from 'next/router';
import React, { useState } from 'react';

const PreferencesPage = () => {
    const preferences = ['omnivor', 'flexitarier', 'pescetarier', 'vegetarisch', 'vegan'];

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
            <div className="flex justify-center items-center">
                <form className="flex justify-center py-8 px-12 w-screen bg-white rounded-[20px]">
                    <fieldset className="flex flex-col">
                        <h2 className="text-3xl font-semibold text-gray-custom4 mb-8">
                            Welcher Ernährungstyp bist du?
                        </h2>
                        <div className={styles.preferencesWrapper}>
                            {preferences.map((preference, i) => (
                                <div key={i} className={styles.choiceWrapper}>
                                    <input
                                        type="radio"
                                        name="preferences"
                                        value={preference}
                                        checked={selection === preference}
                                        onChange={onChoiceChange}
                                    />
                                    <label htmlFor={preference}>{preference}</label>
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
