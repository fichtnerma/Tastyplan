import { useState } from 'react';
import TextInput from '@components/FormInputs/TextInput';
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
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('');

    const searchChanged = (value: string) => {
        setSearchTerm(() => value);
        const debouncedHandler = debounce(() => handleSearch(value), 250);
        debouncedHandler();
    };

    const handleSearch = async (searchTerm: string) => {
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
                <TextInput label="Ingredient" value={searchTerm} onChange={searchChanged} />
                <div className="flex flex-col">
                    <label htmlFor="amount">Amount</label>
                    <input
                        className="border-2 border-green-custom2"
                        type="number"
                        name="amount"
                        id="amount"
                        min={0}
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value)}
                    />
                </div>
                <TextInput label="Unit" value={unit} onChange={setUnit} />
            </div>
        </fieldset>
    );
};

export default AddIngredients;
