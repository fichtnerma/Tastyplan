import { useEffect, useState } from 'react';
import styles from '../Dislikes/Dislikes.module.scss';
import cross from '../../../public/Icons/kreuz.png';
import Image from 'next/image';
import Link from 'next/link';
import { APISearchResponse } from 'src/types/types';
import SearchResultlist from '@components/SearchResultList/SearchResultList';

type OnBackFunction = () => void;
type OnChoiceFunction = (choice: any) => any;
interface DislikesProps {
    onBack: OnBackFunction;
    onChoice: OnChoiceFunction;
    foodDislikes: string[];
}

export default function Dislikes({ onBack, onChoice, foodDislikes }: DislikesProps) {
    // const dislikes = ['Potato', 'Salmon', 'Zucchini', 'Carrot', 'Peas', 'Chicken', 'Spinach', 'Cauliflower', 'Cream'];

    const [allDislikes, setDislike] = useState(foodDislikes);

    useEffect(() => {
        console.log(allDislikes);
    }, [allDislikes]);
    // const [allDislikes, setDislike] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);

    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onBack();
        onChoice((preferences: any) => ({ ...preferences, foodDislikes: allDislikes }));
    };

    const onDeleteChoice = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const clickedDislike = e.currentTarget.getAttribute('data-anchor');
        if (!clickedDislike) return;
        setDislike(allDislikes.filter((dislikes) => dislikes !== clickedDislike));
        onChoice((preferences: any) => ({ ...preferences, foodDislikes: allDislikes }));
    };

    const handleSearch = async () => {
        console.log('Search');
        const res = await fetch(`http://localhost:3000/ingredients?search=${searchTerm}`);
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
                <div className="flex">
                    <div className="text-input-wrapper w-1/2 mr-16">
                        <input
                            type="text"
                            name="search"
                            placeholder="Tomatoes"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {searchResult.length !== 0 && <SearchResultlist searchResults={[...searchResult]} />}
                    <button className="btn-primary" type="button" onClick={handleSearch}>
                        Go
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 my-4 overflow-y-auto">
                    {allDislikes.map((dislike, i) => (
                        <div key={i} className={styles.dislikeWrapper}>
                            <span>
                                <label htmlFor={dislike}>
                                    <p>{dislike}</p>
                                </label>
                                <a className="cursor-pointer" onClick={onDeleteChoice} data-anchor={dislike}>
                                    <Image src={cross} className="" alt="cross" width={25} priority />
                                </a>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary mt-10" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                <Link className="btn-primary mt-10" href={'/weekOverview'}>
                    Create Weekplan
                </Link>
            </div>
        </div>
    );
}
