import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Select, { CSSObjectWithLabel, GroupBase, OptionProps, Options } from 'react-select';
import Icon from '@components/Icon/Icon';
import { fetchWithAuth } from '@helpers/utils';
import styles from './Keyfacts.module.scss';

type SelectOption = {
    value: string;
    label: string;
};

const selectOptions = [
    { value: 'vegetarian', label: 'Vegatarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescetarian', label: 'Pescetarian' },
    { value: 'omnivore', label: 'Omnivore' },
];

const selectStyleOptions = {
    control: (baseStyles: CSSObjectWithLabel) => ({
        ...baseStyles,
        borderWidth: 2,
        borderColor: '#007370',
    }),
    option: (
        baseStyles: CSSObjectWithLabel,
        state: OptionProps<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>>,
    ) => ({
        ...baseStyles,
        backgroundColor: state.isSelected ? '#007370' : '#fffffa',
        color: state.isSelected ? '#fffffa' : '#7D7D7D',
        ':active': {
            backgroundColor: '#00A39E',
            color: '#fffffa',
        },
    }),
};
const Keyfacts = () => {
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const { data: session } = useSession();

    const loadTags = async () => {
        const res = await fetchWithAuth(
            '/service/recipes/tags',
            {
                method: 'GET',
            },
            session,
        );

        const value = await res.json();
        console.log(value);
    };
    return (
        <fieldset>
            <legend className="h1">Add the key facts</legend>
            <div className="flex flex-col mb-7">
                <label htmlFor="cookingTime">How long will it take you in minutes?</label>
                <input
                    className="border-2 border-green-custom2"
                    type="number"
                    name="cookingTime"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(parseInt(e.target.value))}
                    required
                    min={0}
                />
            </div>
            <div>
                <label className="block mb-2" htmlFor="servings">
                    Portions
                </label>
                <div className="flex mb-7">
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0"
                        onClick={() => setServings(servings - 1)}
                    >
                        <Icon icon="minus" size={19} />
                    </button>
                    <p className="text-base w-10 text-center text-green-custom2" id="portion" data-cy="portion-amount">
                        {servings}
                    </p>
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0 mr-5"
                        onClick={() => setServings(servings + 1)}
                    >
                        <Icon icon="plus" size={19} />
                    </button>
                </div>
                <div className={styles.SelectionWrapper}>
                    <label htmlFor="foodLifeStyle">Set the diet</label>
                    <Select
                        name="foodLifeStyle"
                        defaultValue={selectOptions[0]}
                        onChange={setSelectedOption}
                        options={selectOptions}
                        styles={selectStyleOptions}
                    />
                </div>
                <div className={styles.SelectionWrapper}>
                    <label htmlFor="foodLifeStyle">Add some tags</label>
                    <Select name="tags" styles={selectStyleOptions} />
                </div>
            </div>
        </fieldset>
    );
};

export default Keyfacts;
