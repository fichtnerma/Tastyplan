import { APISearchResponse } from 'src/types/types';

interface SearchResultlistProps {
    searchResults: APISearchResponse[];
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
    dislikes: Dislikes[];
}
interface Dislikes {
    id: number;
    name: string;
}

function SearchResultlist({ searchResults, clickHandler, dislikes }: SearchResultlistProps) {
    return (
        <ul
            className="w-full max-h-64 overflow-y-auto rounded-md bg-gray-custom2"
            onClick={clickHandler}
            role="list"
            aria-label="dislike search results"
        >
            {searchResults.map((el, i) => (
                <li
                    className={`px-4 py-1 ${
                        dislikes.find((dislike) => dislike.id === el.id) ? 'bg-gray-custom5' : 'bg-gray-custom2'
                    } border-gray-custom5 cursor-pointer border-b hover:bg-gray-custom5  last:border-none last:rounded-b-md first:rounded-t-md first-letter:capitalize`}
                    data-dislike-name={el.name}
                    data-dislike-id={el.id}
                    data-cy={`item-number-${i}`}
                    key={el.id}
                    tabIndex={0}
                    aria-label="dislike search result item"
                    onKeyDown={clickHandler}
                >
                    {el.name}
                </li>
            ))}
        </ul>
    );
}

export default SearchResultlist;
