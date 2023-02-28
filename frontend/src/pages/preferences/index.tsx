import styles from '@styles/Preferences.module.scss';
import React, { ChangeEvent, useState } from 'react';

const PreferencesPage = () => {
    const [selection, setSelection] = useState('omnivor');

    const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelection(e.target.value);
    };

    return (
        <div className="">
            <form className="flex justify-center relative">
                <fieldset className="flex flex-col w-96 rounded-lg">
                    <legend className="text-3xl font-semibold">Set Preferences</legend>
                    <div className={styles.preferencesWrapper}>
                        <div className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value="omnivor"
                                checked={selection === 'omnivor'}
                                onChange={onChoiceChange}
                            />
                            <label htmlFor="omnivor">Omnivor</label>
                        </div>
                        <div className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value="flexitarian"
                                checked={selection === 'flexitarian'}
                                onChange={onChoiceChange}
                            />
                            <label htmlFor="flexitarian">Flexetarian</label>
                        </div>
                        <div className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value="pescetarian"
                                checked={selection === 'pescetarian'}
                                onChange={onChoiceChange}
                            />
                            <label htmlFor="pescetarian">Pescetarian</label>
                        </div>
                        <div className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value="vegetarian"
                                checked={selection === 'vegetarian'}
                                onChange={onChoiceChange}
                            />
                            <label htmlFor="vegetarian">Vegetarian</label>
                        </div>
                        <div className={styles.choiceWrapper}>
                            <input
                                type="radio"
                                name="preferences"
                                value="vegan"
                                checked={selection === 'vegan'}
                                onChange={onChoiceChange}
                            />
                            <label htmlFor="vegan">Vegan</label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit">Skip Question</button>
                        <button type="submit">Next Step</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default PreferencesPage;
