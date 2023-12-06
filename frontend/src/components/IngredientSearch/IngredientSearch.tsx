import AsyncSelect from 'react-select/async';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import { useState } from 'react';

type SelectOption = {
    id: number;
    value: string;
    label: string;
};

const IngredientSearch = () => {
    const [searchResult, setSearchResult] = useState<SelectOption[]>([]);

    const handleSearch = async (searchTerm: string) => {
        const res = await fetch(`/service/ingredients?search=${searchTerm}`);
        if (!res.ok) {
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        const newOptions: SelectOption[] = data.map((item) => ({
            id: item.id,
            value: item.name.toUpperCase(),
            label: item.name,
        }));
        setSearchResult(newOptions);
    };

    const searchChanged = (value: string) => {
        const debouncedHandler = debounce(() => handleSearch(value), 250);
        debouncedHandler();
    };

    const loadOptions = (inputValue: string, callback: (options: SelectOption[]) => void) => {
        searchChanged(inputValue);
        callback(searchResult);
    };

    return (
        <div>
            <AsyncSelect
                name="ingredients"
                loadOptions={loadOptions}
                isMulti={true}
            />
        </div>
    );
};

export default IngredientSearch;
