import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import SearchResultlist from '@components/SearchResultList/SearchResultList';

import { APISearchResponse } from 'src/types/types';

import { debounce } from '@helpers/utils';

import styles from '../Dislikes/Dislikes.module.scss';

import cross from '../../../public/Icons/kreuz.png';

type OnBackFunction = () => void;
type OnChoiceFunction = (choice: any) => any;
interface DislikesProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    foodDislikes: APISearchResponse[];
    handlePreferences: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Dislikes({ onBack, onChoice, foodDislikes, handlePreferences }: DislikesProps) {
    const [allDislikes, setDislike] = useState(foodDislikes);

    const { data: session, status } = useSession();

    useEffect(() => {}, [allDislikes]);
    // const [allDislikes, setDislike] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);

    useEffect(() => {}, [searchResult]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onBack();
        onChoice((preferences: any) => ({ ...preferences, foodDislikes: allDislikes }));
    };

    const handleAddChoice = (e: React.MouseEvent) => {
        console.log('Add', e.target);
        const target = e.target as HTMLButtonElement;
        const id = target.getAttribute('data-dislike-id');
        const name = target.getAttribute('data-dislike-name');
        if (!id || !name) return;
        const clickedDislike = { id: +id, name } as APISearchResponse;
        setDislike([...allDislikes, clickedDislike]);
        onChoice((preferences: any) => ({ ...preferences, foodDislikes: allDislikes }));
    };

    const onDeleteChoice = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const clickedDislike = e.currentTarget.getAttribute('data-anchor');
        if (!clickedDislike) return;
        setDislike(allDislikes.filter((dislike) => dislike.name !== clickedDislike));
        onChoice((preferences: any) => ({ ...preferences, foodDislikes: allDislikes }));
    };

    const handleSearch = async (searchTerm: string) => {
        console.log('Search');
        const res = await fetch(`http://localhost:3000/ingredients?search=${searchTerm}`, {
            headers: {
                user: session?.user.userId ? session.user.userId : '',
            },
        });
        if (!res.ok) {
            console.log('failed to fetch');
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        setSearchResult([...data]);
        console.log(data);
    };

    return (
        <div>
            <h4 className="mb-8">What food do you dislike?</h4>
            <div className="h-[300px]">
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <div className="text-input-wrapper w-1/2 mr-16">
                            <input
                                type="text"
                                name="search"
                                placeholder="Tomatoes"
                                onChange={(e) => {
                                    setSearchTerm(() => e.target.value);
                                    const debouncedHandler = debounce(() => handleSearch(e.target.value), 250);
                                    debouncedHandler();
                                }}
                            />
                        </div>
                        <button className="btn-primary" type="button" onClick={() => {}}>
                            Go
                        </button>
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
                <button type="button" className="btn-primary mt-10" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                <Link className="btn-primary mt-10" onClick={handlePreferences} href={'/weekOverview'}>
                    Create Weekplan
                </Link>
            </div>
        </div>
    );
}
