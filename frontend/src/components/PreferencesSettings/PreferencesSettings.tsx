import { useRef, useState } from 'react';
import Icon from '@components/Icon/Icon';
import DislikeSearch from '@components/DislikeSearch/DislikeSearch';
import DislikeList from '@components/DislikeList/DislikeList';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import styles from './PreferencesSettings.module.scss';

type OnChoiceFunction = (preferences: {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
}) => void;
type PreferencesSettingsProps = {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    onChoice: OnChoiceFunction;
};

export default function PreferencesSettings({
    formOfDiet,
    allergens,
    foodDislikes,
    onChoice,
}: PreferencesSettingsProps) {
    const foodDietPreferences = [
        { food: 'vegan', description: 'You dont eat any kind of animal products' },
        { food: 'vegetarian', description: 'You dont eat any meat and fish' },
        { food: 'omnivore', description: 'You eat all animal products' },
        { food: 'flexitarian', description: 'You rarely eat all animal products' },
        { food: 'pescetarian', description: 'You only eat fish from all animal products' },
    ];
    const allIntolerances = [
        { name: 'peanuts' },
        { name: 'hazelnut' },
        { name: 'walnuts' },
        { name: 'other nuts' },
        { name: 'lactose' },
        { name: 'gluten' },
        { name: 'eggs' },
        { name: 'shellfish' },
        { name: 'fish' },
        { name: 'soy' },
        { name: 'celery' },
        { name: 'mustard' },
        { name: 'sesame' },
        { name: 'sulfur dioxide' },
        { name: 'lupine' },
        { name: 'mollusk' },
    ];
    const allergensObj = allergens.map((allergen) => {
        return { name: allergen };
    });
    const filteredIntolerances = allIntolerances.filter((intolerance) =>
        allergensObj.every((allergen) => allergen.name !== intolerance.name),
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedDiet, setSelectedDiet] = useState(formOfDiet);
    const [selectedAllergens, setSelectedAllergens] = useState(allergensObj);
    const [selectedDislikes, setSelectedDislikes] = useState(foodDislikes);
    const [dropDownState, setDropDownState] = useState(false);
    const [addAllergens, setAddAllergens] = useState(false);
    const [addDislikes, setAddDislikes] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);
    const [isInputFocus, setInputFocus] = useState(false);
    const [canBeSelectedIntolerances, setCanBeSelectedIntolerances] = useState(filteredIntolerances);

    const searchChanged = (value: string) => {
        setSearchTerm(() => value);
        const debouncedHandler = debounce(() => handleSearch(value), 250);
        debouncedHandler();
    };

    const deleteInput = () => {
        setSearchTerm('');
        searchChanged('');
    };

    const handleSearch = async (searchTerm: string) => {
        const res = await fetch(`/service/ingredients?search=${searchTerm}`);
        if (!res.ok) {
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        setSearchResult([...data]);
    };

    const handleDropDownState = () => {
        if (dropDownState) {
            setDropDownState(false);
        } else {
            setDropDownState(true);
        }
    };
    const handleAllergensState = () => {
        if (addAllergens) {
            setAddAllergens(false);
        } else {
            setAddAllergens(true);
        }
    };
    const handleDislikesState = () => {
        if (addDislikes) {
            setAddDislikes(false);
        } else {
            setAddDislikes(true);
        }
    };

    const onDeleteDislike = (dislikeName: string) => {
        const clickedDislike = dislikeName;
        if (!clickedDislike) return;
        const allDislikes = selectedDislikes;
        const newDislikes = allDislikes.filter((dislike) => dislike.name !== clickedDislike);
        setSelectedDislikes(newDislikes);

        const allergensType = selectedAllergens.map((allergen) => allergen.name);
        onChoice({ formOfDiet: selectedDiet, allergens: allergensType, foodDislikes: newDislikes });
    };

    const onDeleteAllergen = (allergenName: string) => {
        const clickedAllergen = allergenName;
        if (!clickedAllergen) return;
        const allAllergens = selectedAllergens;
        const allergensNew = allAllergens.filter((allergen) => allergen.name !== clickedAllergen);
        setSelectedAllergens(allergensNew);
        setCanBeSelectedIntolerances([...canBeSelectedIntolerances, { name: clickedAllergen }]);
        const allergensType = allergensNew.map((allergen) => allergen.name);
        onChoice({ formOfDiet: selectedDiet, allergens: allergensType, foodDislikes: selectedDislikes });
    };

    const handleClickOnListAndInput = (e: React.MouseEvent) => {
        const clickedElement = e.target as HTMLElement;
        if (clickedElement.tagName === 'INPUT' || clickedElement.tagName === 'LI') {
            setInputFocus(true);
        } else {
            setInputFocus(false);
        }
        if (dropDownState && !dropdownRef.current?.contains(clickedElement)) {
            setDropDownState(false);
        }
    };

    const handleAddChoice = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const id = target.getAttribute('data-dislike-id');
        const name = target.getAttribute('data-dislike-name');
        if (!id || !name) return;
        const clickedDislike = { id: +id, name } as APISearchResponse;
        if (selectedDislikes.find((dislike) => dislike.id === clickedDislike.id)) {
            const newDislikes = selectedDislikes.filter((dislike) => dislike.id !== clickedDislike.id);
            setSelectedDislikes(newDislikes);
            onChoice({ formOfDiet: selectedDiet, allergens: allergens, foodDislikes: newDislikes });
        } else {
            const newDislikes = [...selectedDislikes, clickedDislike];
            setSelectedDislikes(newDislikes);
            onChoice({ formOfDiet: selectedDiet, allergens: allergens, foodDislikes: newDislikes });
        }
    };

    const handleAddIntolerance = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const clickedIntolName = target.getAttribute('data-id');
        if (!clickedIntolName) return;
        const clickedAllergen = canBeSelectedIntolerances.find((intol) => intol.name === clickedIntolName);
        if (clickedAllergen) {
            const allergensNew = [...selectedAllergens, { name: clickedAllergen.name }];
            setSelectedAllergens(allergensNew);
            const updatedIntolerances = canBeSelectedIntolerances.filter(
                (intol) => intol.name !== clickedAllergen.name,
            );
            setCanBeSelectedIntolerances(updatedIntolerances);

            const allergensType = allergensNew.map((allergen) => allergen.name);
            onChoice({ formOfDiet: selectedDiet, allergens: allergensType, foodDislikes: selectedDislikes });
        }
    };

    return (
        <div className="pt-6" onClick={handleClickOnListAndInput}>
            <h5>Your Food Lifestyle</h5>
            <div className="w-1/3 pb-12 pl-8">
                <div
                    className={`flex justify-end items-center relative pr-5 h-[60px] lg:h-[60px] xl:h-[60px] ${styles.choiceWrapper}`}
                >
                    <input
                        className={`absolute top-0 right-0 bottom-0 left-0 cursor:pointer opacity=[.01] z-[-1] w-full h-full rounded-2xl hover:cursor-pointer custom-focus ${styles.customInput}`}
                        type="radio"
                        name="preferences"
                        value={selectedDiet}
                    />
                    <label
                        htmlFor={selectedDiet}
                        className={`absolute top-0 right-0 bottom-0 left-0 hover:cursor-pointer flex flex-col items-left justify-center border-2 border-solid border-green-custom1 rounded-2xl z-[1] font-medium text-[1.13rem] leading-7 pl-6 col-start-1 ${styles.customLabel}`}
                        onClick={handleDropDownState}
                    >
                        <p className="capitalize">{selectedDiet}</p>
                        <p className="text-xs lg:max-w-[170px] xl:max-w-[unset]">
                            {foodDietPreferences.find((preference) => preference.food === selectedDiet)?.description}
                        </p>
                    </label>
                    <button className="z-[2] cursor-pointer pb-1" onClick={handleDropDownState}>
                        <Icon size={50} icon="arrowDownCircle"></Icon>
                    </button>
                </div>
                {dropDownState == true && (
                    <div ref={dropdownRef} className="rounded-2xl">
                        {foodDietPreferences.map((preference) => (
                            <p
                                key={preference.food}
                                className={`cursor-pointer capitalize hover:bg-green-custom2 hover:text-white-custom pl-6 border-gray-custom2 border-b last:border-none last:rounded-b-2xl first:rounded-t-2xl ${
                                    preference.food == selectedDiet
                                        ? 'bg-green-custom2 text-white-custom'
                                        : 'bg-green-custom1 text-black'
                                }`}
                                onClick={() => {
                                    setSelectedDiet(preference.food);
                                    setDropDownState(false);
                                    const allergensType = selectedAllergens.map((allergen) => allergen.name);
                                    onChoice({
                                        formOfDiet: preference.food,
                                        allergens: allergensType,
                                        foodDislikes: selectedDislikes,
                                    });
                                }}
                            >
                                {preference.food}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <h5>Your Intolerances</h5>
            <div className="pb-4 pl-8">
                {selectedAllergens.length == 0 ? (
                    <p className="">You don't have any intolerances.</p>
                ) : (
                    <DislikeList dislikes={selectedAllergens} onDeleteChoice={onDeleteAllergen}></DislikeList>
                )}
            </div>
            <div
                className="w-5/6 pb-4"
                style={{
                    color: 'var(--green-dark)',
                }}
            >
                <button className="pl-8" onClick={handleAllergensState}>
                    {addAllergens == true ? (
                        <Icon size={34} icon="minusCircle"></Icon>
                    ) : (
                        <Icon size={34} icon="addCircle"></Icon>
                    )}
                </button>
            </div>
            {addAllergens == true && (
                <div className="pb-8 pl-8">
                    {canBeSelectedIntolerances.map((intol) => (
                        <button
                            key={intol.name}
                            className="min-w-[70px] capitalize mb-[6px] ml-[6px] border-solid rounded-[50px] border-2 border-green-custom2 bg-white-custom whitespace-nowrap text-[.8rem] hover:bg-green-custom1 py-[5px] px-[6px]"
                            type="button"
                            onClick={handleAddIntolerance}
                            data-id={intol.name}
                        >
                            {intol.name}
                        </button>
                    ))}
                </div>
            )}
            <h5>Your Food Dislikes</h5>
            <div className="pb-4 pl-8">
                {selectedDislikes.length == 0 ? (
                    <p className="">You don't have any dislikes.</p>
                ) : (
                    <DislikeList dislikes={selectedDislikes} onDeleteChoice={onDeleteDislike}></DislikeList>
                )}
            </div>
            <div
                className="w-5/6"
                style={{
                    color: 'var(--green-dark)',
                }}
            >
                <button className="pl-8 pb-4" onClick={handleDislikesState}>
                    {addDislikes == true ? (
                        <Icon size={34} icon="minusCircle"></Icon>
                    ) : (
                        <Icon size={34} icon="addCircle"></Icon>
                    )}
                </button>
            </div>
            {addDislikes == true && (
                <div className="pl-8 w-1/3">
                    <DislikeSearch
                        searchTerm={searchTerm}
                        searchResult={searchResult}
                        isInputFocus={isInputFocus}
                        deleteInput={deleteInput}
                        searchChanged={searchChanged}
                        handleAddChoice={handleAddChoice}
                        allDislikes={selectedDislikes}
                    />
                </div>
            )}
        </div>
    );
}
