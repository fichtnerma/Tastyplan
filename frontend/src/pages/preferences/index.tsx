import styles from '@styles/Preferences.module.scss';
import React, { useState } from 'react';

const PreferencesPage = () => {
    const preferences = ['omnivor', 'flexitarian', 'pescetarian', 'vegetarian', 'vegan'];

    const [selection, setSelection] = useState('omnivor');

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-90v bg-green-custom2">
            <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[42px]">
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
                        <button type="submit" className="font-medium text-gray-custom4">
                            Skip Question
                        </button>
                        <button type="submit" className="absolute top-0 right-0 font-medium text-gray-custom4">
                            Next Step
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default PreferencesPage;
