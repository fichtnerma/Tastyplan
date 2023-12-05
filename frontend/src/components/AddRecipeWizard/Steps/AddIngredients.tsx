import { useState } from 'react';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';

type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

const AddIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [searchResult, setSearchResult] = useState<APISearchResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    console.log(searchResult);

    const handleSearch = async (searchTerm: string) => {
        setSearchTerm(() => searchTerm);
        const debouncedHandler = debounce(() => handleSearch(searchTerm), 250);
        debouncedHandler();
        const res = await fetch(`/service/ingredients?search=${searchTerm}`);
        if (!res.ok) {
            return;
        }
        const data = (await res.json()) as unknown as APISearchResponse[];
        setSearchResult([...data]);
    };

    return (
        <fieldset>
            <legend className="h1">Add ingredients</legend>
            <div>list</div>
            <div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" id="amount" />
                </div>
                <div>
                    <label htmlFor="ingredient">Ingredient</label>
                    <input type="text" name="ingredient" id="ingredient" onChange={handleSearch} />
                </div>
                <div>
                    <label htmlFor="unit">Unit</label>
                    <input type="text" name="unit" id="unit" />
                </div>
            </div>
        </fieldset>
    );
};

export default AddIngredients;
