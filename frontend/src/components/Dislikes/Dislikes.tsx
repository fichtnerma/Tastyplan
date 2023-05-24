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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChoice(allDislikes);
        if (e.currentTarget.getAttribute('data-btn') == 'next') {
            onNext();
        } else {
            onBack();
        }
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
            <h4 className="mb-2">What food do you dislike?</h4>
            <div className="flex h-[300px]">
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
                        </div>
                    </div>
                    {searchResult.length !== 0 && (
                        <SearchResultlist searchResults={[...searchResult]} clickHandler={handleAddChoice} />
                    )}
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
                <button type="submit" className="btn-primary mt-6" data-btn="next" onClick={handleClick}>
                    Next
                </button>
            </div>
        </div>
    );
}
