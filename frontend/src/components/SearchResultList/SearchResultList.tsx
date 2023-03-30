import { APISearchResponse } from 'src/types/types';

function SearchResultlist({ searchResults }: { searchResults: APISearchResponse[] }) {
    return (
        <ul>
            {searchResults.map((el) => (
                <li key={el.id}>{el.name}</li>
            ))}
        </ul>
    );
}

export default SearchResultlist;
