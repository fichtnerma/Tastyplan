import { useState } from 'react';
import Image from 'next/image';
import SearchResultlist from '@components/SearchResultList/SearchResultList';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import styles from '../Dislikes/Dislikes.module.scss';
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
        dislikes?.categoryChildren.map((dislike) => {
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
            target.style.backgroundColor = 'var(--gray-2)';
            //add hover effect to element: backgroundColor = 'var(--gray-5)'
            // target.classList.add('hover-style');
            setDislike(allDislikes.filter((dislike) => dislike.id !== clickedDislike.id));
        } else {
            target.style.backgroundColor = 'var(--gray-5)';
            setDislike([...allDislikes, clickedDislike]);
        }

        onChoice(allDislikes);
    };

    const onDeleteChoice = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const clickedDislike = e.currentTarget.getAttribute('data-anchor');
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

    return (
        <div>
            <h4 className="mb-2 h2">What food do you dislike?</h4>
            <div className="flex h-[400px] lg:h-[300px]">
                <div className="flex w-1/3 flex-col">
                    <div className="w-full flex">
                        <div className="text-input-wrapper w-full">
                            <input
                                type="text"
                                placeholder="Search ingredients"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(() => e.target.value);
                                    const debouncedHandler = debounce(() => handleSearch(e.target.value), 250);
                                    debouncedHandler();
                                }}
                                data-cy="dislikes-search-field"
                            />
                            <div className="relative">
                                <div className="absolute z-10">
                                    {searchResult.length !== 0 && (
                                        <SearchResultlist
                                            searchResults={[...searchResult]}
                                            clickHandler={handleAddChoice}
                                        />
                                    )}
                                </div>
                            </div>
                            <p className="inline-block text-base pt-3">Add this to your dislikes.</p>
                            <div className="flex flex-wrap">
                                {dislikeRecommendations.map((dislike, i) => (
                                    <div key={i} className={styles.recommendationsWrapper}>
                                        <button type="button" onClick={handleAddRecommendation} data-id={dislike.id}>
                                            {dislike.categoryName}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" h-[280px] overflow-y-auto ml-8 w-2/3">
                    <div className="flex flex-wrap mb-2 gap-x-2">
                        {allDislikes.map((dislike, i) => (
                            <div key={i} className={styles.dislikeWrapper}>
                                <span>
                                    <label className="flex" htmlFor={dislike.name}>
                                        <p className="inline-block text-base pr-2">{dislike.name}</p>

                                        <a
                                            className="inline-block cursor-pointer"
                                            onClick={onDeleteChoice}
                                            data-anchor={dislike.name}
                                        >
                                            <Image src={cross} className="" alt="cross" width={20} priority />
                                        </a>
                                    </label>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="button" className="btn-primary mt-6" data-btn="back" onClick={handleClick}>
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
