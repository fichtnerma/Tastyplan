import { APISearchResponse } from 'src/types/types';

interface SearchResultlistProps {
    searchResults: APISearchResponse[];
    clickHandler: (e: React.MouseEvent) => void;
    ref?: React.Ref<HTMLInputElement>;
}

function SearchResultlist({ searchResults, clickHandler, ref }: SearchResultlistProps) {
    return (
        <ul className="w-full max-h-72 overflow-y-auto rounded-md bg-gray-custom2" onClick={clickHandler} ref={ref}>
            {searchResults.map((el, i) => (
                <li
                    className="px-4 py-1 cursor-pointer border-b border-gray-custom5 hover:bg-gray-custom5 last:border-none last:rounded-b-md first:rounded-t-md first-letter:capitalize"
                    data-dislike-name={el.name}
                    data-dislike-id={el.id}
                    data-cy={`item-number-${i}`}
                    key={el.id}
                >
                    {el.name}
                </li>
            ))}
        </ul>
    );
}

export default SearchResultlist;
