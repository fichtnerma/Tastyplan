import { useState } from 'react';
import Image from 'next/image';
import SearchResultlist from '@components/SearchResultList/SearchResultList';
import TextInput from '@components/FormInputs/TextInput';
import DislikeList from '@components/DislikeList/DislikeList';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import cross from '../../../public/Icons/kreuz.png';

type OnNextFunction = () => void;
type OnBackFunction = () => void;
type OnChoiceFunction = (choices: APISearchResponse[]) => void;
interface DislikesProps {
    onNext: OnNextFunction;
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    foodDislikes: APISearchResponse[];
}

export default function Dislikes({ onNext, onBack, onChoice, foodDislikes }: DislikesProps) {
    const [allDislikes, setDislike] = useState(foodDislikes);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);
    const [isInputFocus, setInputFocus] = useState(false);

    const dislikeRecommendations = [
        {
            categoryName: 'Brussel sprouts',
            id: 'brussel_sprouts',
            categoryChildren: [
                { id: 612, name: 'brussels sprouts, steamed' },
                { id: 613, name: 'brussels sprouts, raw' },
            ],
        },
        { categoryName: 'Cilantro', id: 'cilantro', categoryChildren: [{ id: 865, name: 'cilantro' }] },
        {
            categoryName: 'Mushrooms',
            id: 'mushrooms',
            categoryChildren: [
                { id: 119, name: 'mushroom, steamed' },
                { id: 120, name: 'mushroom, raw' },
                { id: 118, name: 'mushroom (canned)' },
                { id: 724, name: 'porcini mushroom, steamed' },
                { id: 517, name: 'mushroom , steamed' },
                { id: 518, name: 'mushroom , raw' },
            ],
        },
        { categoryName: 'Paprika', id: 'paprika', categoryChildren: [{ id: 492, name: 'paprika' }] },
        {
            categoryName: 'Zucchini',
            id: 'zucchini',
            categoryChildren: [
                { id: 832, name: 'courgettes, raw' },
                { id: 831, name: 'courgettes, steamed' },
                { id: 830, name: 'courgettes, steamed' },
            ],
        },
        {
            categoryName: 'Onions',
            id: 'onions',
            categoryChildren: [
                { id: 845, name: 'onion, raw' },
                { id: 844, name: 'onion, roasted' },
                { id: 843, name: 'onion, steamed' },
            ],
        },
        {
            categoryName: 'Spinach',
            id: 'spinach',
            categoryChildren: [
                { id: 717, name: 'spinach, raw' },
                { id: 716, name: 'spinach, steamed' },
            ],
        },
    ];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChoice(allDislikes);
        if (e.currentTarget.getAttribute('data-btn') == 'next') {
            onNext();
        } else {
            onBack();
        }
    };

    const handleAddRecommendation = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const categoryId = target.getAttribute('data-id');
        const dislikes = dislikeRecommendations.find((dislike) => dislike.id === categoryId);
        dislikes?.categoryChildren.forEach((dislike) => {
            if (!allDislikes.find((dislikeAll) => dislikeAll.id === dislike.id)) {
                setDislike((allDislikes) => [...allDislikes, dislike]);
                target.style.display = 'none';
            }
        });
        onChoice(allDislikes);
    };

    const handleAddChoice = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const id = target.getAttribute('data-dislike-id');
        const name = target.getAttribute('data-dislike-name');
        if (!id || !name) return;
        const clickedDislike = { id: +id, name } as APISearchResponse;
        if (allDislikes.find((dislike) => dislike.id === clickedDislike.id)) {
            setDislike(allDislikes.filter((dislike) => dislike.id !== clickedDislike.id));
        } else {
            setDislike([...allDislikes, clickedDislike]);
        }
        onChoice(allDislikes);
    };

    const onDeleteChoice = (dislikeName: string) => {
        // const clickedDislike = e.currentTarget.getAttribute('data-anchor');
        const clickedDislike = dislikeName;
        if (!clickedDislike) return;
        setDislike(allDislikes.filter((dislike) => dislike.name !== clickedDislike));
        onChoice(allDislikes);
    };

    const handleSearch = async (searchTerm: string) => {
        const res = await fetch(`/service/ingredients?search=${searchTerm}`);
        if (!res.ok) {
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        setSearchResult([...data]);
    };

    const searchChanged = (value: string) => {
        setSearchTerm(() => value);
        const debouncedHandler = debounce(() => handleSearch(value), 250);
        debouncedHandler();
    };

    const deleteInput = () => {
        setSearchTerm('');
        searchChanged('');
    };

    const handleClickOnListAndInput = (e: React.MouseEvent) => {
        const clickedElement = e.target as HTMLElement;
        if (clickedElement.tagName === 'INPUT' || clickedElement.tagName === 'LI') {
            setInputFocus(true);
        } else {
            setInputFocus(false);
        }
    };

    return (
        <div onClick={handleClickOnListAndInput}>
            <h4 className="!mb-2 h2">What food do you dislike?</h4>
            <div className="flex h-[400px] lg:h-[300px] flex-col lg:flex-row">
                <div className="flex w-full flex-col lg:w-1/3">
                    <div className="w-full flex">
                        <div className="text-input-wrapper w-full">
                            <TextInput
                                placeholder="Search ingredients"
                                value={searchTerm}
                                decoration={
                                    <button type="button" onClick={deleteInput}>
                                        <Image src={cross} className="pr-1" alt="cross" width={20} priority />
                                    </button>
                                }
                                decorationPosition="end"
                                onChange={searchChanged}
                            />
                            <div className="relative">
                                <div className="absolute z-1 w-full">
                                    {searchResult.length !== 0 && isInputFocus == true && (
                                        <SearchResultlist
                                            searchResults={[...searchResult]}
                                            clickHandler={handleAddChoice}
                                            dislikes={allDislikes}
                                        />
                                    )}
                                </div>
                            </div>
                            <p className="inline-block text-base pt-3">Add this to your dislikes.</p>
                            <div className="flex flex-wrap">
                                {dislikeRecommendations.map((dislike) => (
                                    <button
                                        key={dislike.id}
                                        className="mb-[6px] ml-[6px] border-solid rounded-[50px] border-2 border-green-custom2 bg-white-custom whitespace-nowrap text-[.8rem] hover:bg-green-custom1 py-[5px] px-[6px]"
                                        type="button"
                                        onClick={handleAddRecommendation}
                                        data-id={dislike.id}
                                    >
                                        {dislike.categoryName}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" h-[280px] overflow-y-auto mt-2 lg:mt-0 lg:ml-8 lg:w-2/3">
                    <DislikeList dislikes={allDislikes} onDeleteChoice={onDeleteChoice} />
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="button" className="btn-primary-unobtrusive mt-6" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                <button
                    type="submit"
                    className="btn-primary mt-6"
                    data-btn="next"
                    onClick={handleClick}
                    data-cy="next-btn"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
