import styles from '@styles/Preferences.module.scss';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';

const PreferencesPage = () => {
    const preferences = ['omnivor', 'flexitarian', 'pescetarian', 'vegetarian', 'vegan'];

    const [selection, setSelection] = useState('omnivor');

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(e.target.value);
    };

    const onSubmitSelection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const clickedAnchor = e.currentTarget.getAttribute('data-anchor');
        const currentSelection = clickedAnchor === 'skip' ? 'omnivor' : selection;

        Router.push({
            pathname: '/intolerances',
            query: {
                formOfDiet: currentSelection,
            },
        });
    };

    return (
        <div className="flex justify-center items-center">
            <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[20px]">
                <fieldset className="flex flex-col">
                    <h2 className="text-5xl font-semibold text-gray-custom4 mb-14">Set Preferences</h2>
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
                            Skip Question
                        </a>
                        <a
                            className="absolute top-0 right-0 font-medium text-gray-custom4"
                            href="/preferences"
                            onClick={onSubmitSelection}
                            data-anchor="next"
                        >
                            Next Step
                        </a>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default PreferencesPage;
