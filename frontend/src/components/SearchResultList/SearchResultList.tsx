import { APISearchResponse } from 'src/types/types';

interface SearchResultlistProps {
    searchResults: APISearchResponse[];
    clickHandler: (e: React.MouseEvent) => void;
}

function SearchResultlist({ searchResults, clickHandler }: SearchResultlistProps) {
    return (
        <ul className="max-h-72 overflow-y-auto w-1/3 rounded-md bg-gray-custom2 z-[1]" onClick={clickHandler}>
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
