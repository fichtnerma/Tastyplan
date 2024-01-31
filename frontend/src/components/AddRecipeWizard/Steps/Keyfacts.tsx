import { useEffect, useState } from 'react';
import Select, { CSSObjectWithLabel, GroupBase, OptionProps } from 'react-select';
import Icon from '@components/Icon/Icon';
import NumberInput from '@components/FormInputs/NumberInput';
import useFetchWithAuth from '@hooks/fetchWithAuth';
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

export const selectStyleOptions = {
    control: (baseStyles: CSSObjectWithLabel) => ({
        ...baseStyles,
        height: '45px',
        borderWidth: 3,
        backgroundColor: '#fffffa',
        borderColor: '#007370',
        borderRadius: '15px',
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
    useFetchAuth: typeof useFetchWithAuth;
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
    useFetchAuth = useFetchWithAuth,
}: KeyfactsProps) => {
    const [cookingTime, setCookingTime] = useState(currentTotalTime);
    const [servings, setServings] = useState(currentServings);
    const [selectedFormOfDiet, setSelectedFormOfDiet] = useState<SelectOption>(currentSelectedOption);
    const [tagOptions, setTagOptions] = useState<SelectOption[]>([]);
    const { data } = useFetchAuth('/service/recipes/tags') as unknown as {
        data: string[];
        error: unknown;
    };

    const handleCookingTimeChange = (cookingTime: number) => {
        setCookingTime(cookingTime);
        onCookingTime(cookingTime);
    };

    const handleServingsChange = (servings: number) => {
        if (servings < 0) return;
        setServings(servings);
        onServings(servings);
    };

    const handleFormOfDietChange = (selectedOption: unknown | null) => {
        if (!selectedOption) return;
        const typedOption = selectedOption as SelectOption;
        setSelectedFormOfDiet(typedOption);
        onFoodLifestyle(typedOption.value);
    };

    const handleTagChange = (selectedOptions: readonly unknown[] | null) => {
        if (!selectedOptions) return;
        const typedOptions = selectedOptions as SelectOption[];

        onTags(typedOptions);
    };

    useEffect(() => {
        if (!data) return;
        const newTagOptions: SelectOption[] = data.map((tag: string) => {
            return { value: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1) };
        });
        setTagOptions(newTagOptions);
    }, [data]);

    return (
        <fieldset className="overflow-x-auto h-full">
            <legend className="h3">Add the key facts</legend>
            <div className="p-2 pt-0 pb-8">
                <div className="flex flex-col mb-7">
                    <NumberInput
                        value={cookingTime}
                        label="How long will it take you in minutes?"
                        id="cookingTime"
                        min={1}
                        required
                        onChange={(value) => handleCookingTimeChange(value)}
                        cypressId="cooking-time-input"
                    />
                </div>
                <div>
                    <label htmlFor="increasePortion">Portions</label>
                    <div className="flex mb-7">
                        <button
                            type="button"
                            className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0"
                            onClick={() => handleServingsChange(servings - 1)}
                            disabled={servings <= 1}
                            data-cy="decrease-serv-btn"
                        >
                            <Icon icon="minus" size={19} />
                        </button>
                        <p
                            className="text-base w-10 text-center text-green-custom2"
                            id="portion"
                            data-cy="portion-amount"
                        >
                            {servings}
                        </p>
                        <button
                            id="increasePortion"
                            type="button"
                            data-testid="increasePortion"
                            className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0 mr-5"
                            onClick={() => handleServingsChange(servings + 1)}
                            data-cy="increase-serv-btn"
                        >
                            <Icon icon="plus" size={19} />
                        </button>
                    </div>
                    <div className={styles.SelectionWrapper}>
                        <label htmlFor="foodLifeStyle">Set the diet</label>
                        <Select
                            name="foodLifeStyle"
                            id="foodLifeStyle"
                            aria-label="foodLifeStyle"
                            aria-labelledby="foodLifeStyle"
                            defaultValue={selectedFormOfDiet}
                            onChange={handleFormOfDietChange}
                            options={selectFormOfDietOptions}
                            styles={selectStyleOptions}
                        />
                    </div>
                    <div className={styles.SelectionWrapper}>
                        <label htmlFor="tags">Add some tags</label>
                        <Select
                            //@ts-ignore
                            isMulti
                            name="recipeTags"
                            id="recipeTags"
                            aria-label="recipeTags"
                            aria-labelledby="recipeTags"
                            defaultValue={currentTags}
                            options={tagOptions}
                            styles={selectStyleOptions}
                            //@ts-ignore
                            onChange={handleTagChange}
                        />
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default Keyfacts;
