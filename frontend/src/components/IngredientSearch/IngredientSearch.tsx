import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';

export type SelectOption = {
    id: number;
    value: string;
    label: string;
};

type IngredientSearchProps = {
    onSelectOption: (ingredients: SelectOption) => void;
};

const IngredientSearch = ({ onSelectOption }: IngredientSearchProps) => {
    const [searchResult, setSearchResult] = useState<SelectOption[]>([]);
    const [selecedOption, setSelectedOption] = useState<SelectOption>();

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

    const handleSelectionChange = (option: SelectOption) => {
        setSelectedOption(option);
        onSelectOption(option);
    };

    return (
        <div>
            <AsyncSelect name="ingredients" onChange={handleSelectionChange} loadOptions={loadOptions} />
        </div>
    );
};

export default IngredientSearch;
