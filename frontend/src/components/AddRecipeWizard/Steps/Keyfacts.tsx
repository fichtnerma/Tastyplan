import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Select, { CSSObjectWithLabel, GroupBase, OptionProps } from 'react-select';
import Icon from '@components/Icon/Icon';
import { fetchWithAuth } from '@helpers/utils';
import styles from './Keyfacts.module.scss';

export type SelectOption = {
    value: string;
    label: string;
};

const selectFormOfDietOptions = [
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
        color: state.isSelected ? '#fffffa' : '#3a3a3a',
        ':active': {
            backgroundColor: '#00A39E',
            color: '#fffffa',
        },
    }),
};

type KeyfactsProps = {
    currentTotalTime: number;
    currentServings: number;
    currentSelectedFormOfDiet: SelectOption;
    currentTags: SelectOption[];
    onTotalTime: (totalTime: number) => void;
    onServings: (servings: number) => void;
    onFoodLifestyle: (lifestyle: string) => void;
    onTags: (tags: SelectOption[]) => void;
};
const Keyfacts = ({
    currentTotalTime,
    currentServings,
    currentTags,
    currentSelectedFormOfDiet: currentSelectedOption,
    onTotalTime: onCookingTime,
    onServings,
    onFoodLifestyle,
    onTags,
}: KeyfactsProps) => {
    const [totalTime, setTotalTime] = useState(currentTotalTime);
    const [servings, setServings] = useState(currentServings);
    const [selectedFormOfDiet, setSelectedFormOfDiet] = useState<SelectOption>(currentSelectedOption);
    const [tagOptions, setTagOptions] = useState<SelectOption[]>([]);
    const [selectedTags, setSelectedTags] = useState<SelectOption[]>(currentTags);
    const { data: session } = useSession();

    const loadTags = async () => {
        const res = await fetchWithAuth(
            '/service/recipes/tags',
            {
                method: 'GET',
            },
            session,
        );

        const tags = await res.json();
        const newTagOptions: SelectOption[] = tags.map((tag: string) => {
            return { value: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1) };
        });
        setTagOptions(newTagOptions);
    };

    const handleCookingTimeChange = (cookingTime: number) => {
        setTotalTime(cookingTime);
        onCookingTime(cookingTime);
    };

    const handleServingsChange = (servings: number) => {
        if (servings < 0) return;
        setServings(servings);
        onServings(servings);
    };

    const handleFormOfDietChange = (option: unknown | null) => {
        const typedOption = option as SelectFormOfDietOption;
        setSelectedFormOfDiet(typedOption);
        onFoodLifestyle(typedOption.value);
    };

    const handleTagChange = (selectedOptions: unknown[]) => {
        console.log(selectedOptions);
        const typedOptions = selectedOptions as SelectTagOption[];
        setSelectedTags(typedOptions);
        onTags(typedOptions);
    };

    useEffect(() => {
        loadTags();
    }, [loadTags]);

    return (
        <fieldset>
            <legend className="h2">Add the key facts</legend>
            <div className="flex flex-col mb-7">
                <label className="h5" htmlFor="cookingTime">
                    How long will it take you in minutes?
                </label>
                <input
                    className="h-[50px] p-4 border-solid border-[2px] rounded-[25px] border-green-custom2"
                    type="number"
                    name="cookingTime"
                    value={totalTime}
                    onChange={(e) => handleCookingTimeChange(parseInt(e.target.value))}
                    required
                    min={0}
                />
            </div>
            <div>
                <label className="h5 block" htmlFor="servings">
                    Portions
                </label>
                <div className="flex mb-7">
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0"
                        onClick={() => handleServingsChange(servings - 1)}
                        disabled={servings <= 0}
                    >
                        <Icon icon="minus" size={19} />
                    </button>
                    <p className="text-base w-10 text-center text-green-custom2" id="portion" data-cy="portion-amount">
                        {servings}
                    </p>
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0 mr-5"
                        onClick={() => handleServingsChange(servings + 1)}
                    >
                        <Icon icon="plus" size={19} />
                    </button>
                </div>
                <div className={styles.SelectionWrapper}>
                    <label className="h5 block" htmlFor="foodLifeStyle">
                        Set the diet
                    </label>
                    <Select
                        name="foodLifeStyle"
                        defaultValue={selectedFormOfDiet}
                        onChange={handleFormOfDietChange}
                        options={selectFormOfDietOptions}
                        styles={selectStyleOptions}
                    />
                </div>
                <div className={styles.SelectionWrapper}>
                    <label className="h5 block" htmlFor="foodLifeStyle">
                        Add some tags
                    </label>
                    <Select isMulti options={tagOptions} styles={selectStyleOptions} onChange={handleTagChange} />
                </div>
            </div>
        </fieldset>
    );
};

export default Keyfacts;
