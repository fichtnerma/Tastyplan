import { APISearchResponse } from 'src/types/types';

interface SearchResultlistProps {
    searchResults: APISearchResponse[];
    clickHandler: (e: React.MouseEvent) => void;
}

function SearchResultlist({ searchResults, clickHandler }: SearchResultlistProps) {
    return (
        <ul className="w-full max-h-72 overflow-y-auto rounded-md bg-gray-custom2" onClick={clickHandler}>
            {searchResults.map((el) => (
                <li
                    className="px-4 py-1 cursor-pointer border-b border-gray-custom5 hover:bg-gray-custom5 last:border-none last:rounded-b-md first:rounded-t-md first-letter:capitalize"
                    data-dislike-name={el.name}
                    data-dislike-id={el.id}
                    key={el.id}
                >
                    {el.name}
                </li>
            ))}
        </ul>
    );
}

export default SearchResultlist;
