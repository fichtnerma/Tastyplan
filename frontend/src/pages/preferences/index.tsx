import styles from '@styles/Preferences.module.scss';

const PreferencesPage = () => {
    return (
        <form>
            <fieldset>
                <legend className="text-3xl font-semibold bg-red-custom">Set Preferences</legend>
                <div className={`${styles.preferencesWrapper} bg-red-500`}>
                    <div className={styles.choiceWrapper}>
                        <input type="radio" name="preferences" id="omnivor" />
                        <label htmlFor="omnivor">Omnivor</label>
                    </div>
                    <div className={styles.choiceWrapper}>
                        <input type="radio" name="preferences" id="flexitarian" />
                        <label htmlFor="flexitarian">Flexetarian</label>
                    </div>
                    <div className={styles.choiceWrapper}>
                        <input type="radio" name="preferences" id="pescetarian" />
                        <label htmlFor="pescetarian">Pescetarian</label>
                    </div>
                    <div className={styles.choiceWrapper}>
                        <input type="radio" name="preferences" id="vegetarian" />
                        <label htmlFor="vegetarian">Vegetarian</label>
                    </div>
                    <div className={styles.choiceWrapper}>
                        <input type="radio" name="preferences" id="vegan" />
                        <label htmlFor="vegan">Vegan</label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit">Skip Question</button>
                    <button type="submit">Next Step</button>
                </div>
            </fieldset>
        </form>
    );
};

export default PreferencesPage;
