import { APISearchResponse } from 'src/types/types';

interface SearchResultlistProps {
    searchResults: APISearchResponse[];
    clickHandler: (e: React.MouseEvent) => void;
}

function SearchResultlist({ searchResults, clickHandler }: SearchResultlistProps) {
    return (
        <ul className='w-fit rounded-2xl bg-green-custom1 p-5' onClick={clickHandler}>
            {searchResults.map((el) => (
                <li className='py-1' data-dislike-name={el.name} data-dislike-id={el.id}  key={el.id}>{el.name}</li>
            ))}
        </ul>
    );
}

export default SearchResultlist;
