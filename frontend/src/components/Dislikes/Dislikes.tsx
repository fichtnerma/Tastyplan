import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchResultlist from '@components/SearchResultList/SearchResultList';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import styles from '../Dislikes/Dislikes.module.scss';
import cross from '../../../public/Icons/kreuz.png';

type OnBackFunction = () => void;
type OnChoiceFunction = (choices: APISearchResponse[]) => void;
interface DislikesProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    foodDislikes: APISearchResponse[];
    handlePreferences: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Dislikes({ onBack, onChoice, foodDislikes, handlePreferences }: DislikesProps) {
    const [allDislikes, setDislike] = useState(foodDislikes);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);

    const handleBack = () => {
        onChoice(allDislikes);
        onBack();
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
            <h4 className="mb-8">What food do you dislike?</h4>
            <div className="h-[300px]">
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <div className="text-input-wrapper w-1/3 mr-16">
                            <input
                                type="text"
                                name="search"
                                placeholder="Tomatoes"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(() => e.target.value);
                                    const debouncedHandler = debounce(() => handleSearch(e.target.value), 250);
                                    debouncedHandler();
                                }}
                            />
                        </div>
                    </div>
                    {searchResult.length !== 0 && (
                        <SearchResultlist searchResults={[...searchResult]} clickHandler={handleAddChoice} />
                    )}
                </div>
                <div className="grid grid-cols-4 gap-4 my-4 overflow-y-auto">
                    {allDislikes.map((dislike, i) => (
                        <div key={i} className={styles.dislikeWrapper}>
                            <span>
                                <label htmlFor={dislike.name}>
                                    <p>{dislike.name}</p>
                                </label>
                                <a className="cursor-pointer" onClick={onDeleteChoice} data-anchor={dislike.name}>
                                    <Image src={cross} className="" alt="cross" width={25} priority />
                                </a>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="button" className="btn-primary mt-10" data-btn="back" onClick={handleBack}>
                    Back
                </button>
                <Link className="btn-primary mt-10" onClick={handlePreferences} href={'/weekOverview'}>
                    Create Weekplan
                </Link>
            </div>
        </div>
    );
}
