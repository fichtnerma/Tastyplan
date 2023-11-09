import { useEffect, useRef, useState } from 'react';
import Icon from '@components/Icon/Icon';
import DislikeSearch from '@components/DislikeSearch/DislikeSearch';
import DislikeList from '@components/DislikeList/DislikeList';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import styles from './PreferencesSettings.module.scss';

type OnSaveFunction = (preferences: {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
}) => void;
type PreferencesSettingsProps = {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    onSave: OnSaveFunction;
};

export default function PreferencesSettings({ formOfDiet, allergens, foodDislikes, onSave }: PreferencesSettingsProps) {
    const foodDietPreferences = [
        { food: 'vegan', description: 'You dont eat any kind of animal products' },
        { food: 'vegetarian', description: 'You dont eat any meat and fish' },
        { food: 'omnivore', description: 'You eat all animal products' },
        { food: 'flexitarian', description: 'You rarely eat all animal products' },
        { food: 'pescetarian', description: 'You only eat fish from all animal products' },
    ];
    const allergensObj = allergens.map((allergen) => {
        return { name: allergen };
    });
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

    useEffect(() => {
        console.log(selectedDislikes);
    }, [selectedDislikes]);

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
        setSelectedDislikes(allDislikes.filter((dislike) => dislike.name !== clickedDislike));
    };

    const onDeleteAllergen = (allergenName: string) => {
        const clickedAllergen = allergenName;
        if (!clickedAllergen) return;
        const allAllergens = selectedAllergens;
        setSelectedAllergens(allAllergens.filter((allergen) => allergen.name !== clickedAllergen));
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
            setSelectedDislikes(selectedDislikes.filter((dislike) => dislike.id !== clickedDislike.id));
        } else {
            setSelectedDislikes([...selectedDislikes, clickedDislike]);
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
                    <div className="z-[2] cursor-pointer pb-1">
                        <Icon size={50} icon="arrowDownCircle"></Icon>
                    </div>
                </div>
                {dropDownState == true && (
                    <div ref={dropdownRef} className="rounded-2xl">
                        {foodDietPreferences.map((preference) => (
                            <p
                                key={preference.food}
                                className={`cursor-pointer capitalize hover:bg-gray-custom2 pl-6 border-gray-custom2 border-b last:border-none last:rounded-b-2xl first:rounded-t-2xl ${
                                    preference.food == selectedDiet ? 'bg-gray-custom2' : 'bg-green-custom1'
                                }`}
                                onClick={() => {
                                    setSelectedDiet(preference.food);
                                    setDropDownState(false);
                                }}
                            >
                                {preference.food}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <h5>Your Allergens</h5>
            <div className="pb-4 pl-8">
                <DislikeList dislikes={selectedAllergens} onDeleteChoice={onDeleteAllergen}></DislikeList>
            </div>
            <div
                className="w-5/6 pb-8"
                style={{
                    color: 'var(--green-dark)',
                }}
            >
                <button className="float-right" onClick={handleAllergensState}>
                    {addAllergens == true ? (
                        <Icon size={34} icon="minusCircle"></Icon>
                    ) : (
                        <Icon size={34} icon="addCircle"></Icon>
                    )}
                </button>
            </div>
            {addAllergens == true && (
                <div>
                    <p>Add Allergens</p>
                </div>
            )}
            <h5>Your Food Dislikes</h5>
            <div className="pb-2 pl-8">
                <DislikeList dislikes={selectedDislikes} onDeleteChoice={onDeleteDislike}></DislikeList>
            </div>
            <div
                className="w-5/6"
                style={{
                    color: 'var(--green-dark)',
                }}
            >
                <button className="float-right" onClick={handleDislikesState}>
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
            <div>
                <button
                    type="submit"
                    className="btn-primary float-right mt-20"
                    data-btn="next"
                    onClick={() => {
                        const allergensType = selectedAllergens.map((allergen) => allergen.name);
                        console.log(selectedDislikes);
                        onSave({
                            formOfDiet: selectedDiet,
                            allergens: allergensType,
                            foodDislikes: selectedDislikes,
                        });
                    }}
                    data-cy="next-btn"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
