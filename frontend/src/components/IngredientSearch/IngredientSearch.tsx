import { useState } from 'react';
import Async, { useSelect } from 'react-select/async';
import Select, { CSSObjectWithLabel, GroupBase, OptionProps } from 'react-select';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';

type SelectOption = {
    id: number;
    value: string;
    label: string;
};

const IngredientSearch = () => {
    const [selectedOptions, setSelectedOptions] = useState<APISearchResponse>([]);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (searchTerm: string) => {
        const res = await fetch(`/service/ingredients?search=${searchTerm}`);
        if (!res.ok) {
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        console.log(data);
        const newOptions: SelectOption[] = data.map((item) => {
            return {
                id: item.id,
                value: item.name.toUpperCase(),
                label: item.name,
            };
        });

        setOptions(newOptions);
    };

    const searchChanged = (value: string) => {
        setSearchTerm(() => value);
        const debouncedHandler = debounce(() => handleSearch(value), 250);
        debouncedHandler();
    };
    const loadOptions = (inputValue: string, callback: (options: SelectOption[])) => {
      callback(searchChanged(inputValue));
  };
    return (
        <div>
            <AsyncSelect
                name="ingredients"
                onChange={handleSelectionChange}
                onInputChange={handleInputChange}
                options={searchResult}
                isMulti={true}
            />
        </div>
    );
};

export default IngredientSearch;
