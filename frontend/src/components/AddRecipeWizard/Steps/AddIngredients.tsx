import { useState } from 'react';
import TextInput from '@components/FormInputs/TextInput';
import { debounce } from '@helpers/utils';
import { APISearchResponse } from 'src/types/types';
import { Ingredient } from 'src/types/types';

type AddIngredientsProps = {
    onAddIngredient: (ingredients: Ingredient[]) => void;
};

const AddIngredients = ({ onAddIngredient }: AddIngredientsProps) => {
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

    const handleAddIngredient = () => {
        console.log('handleAddIngredient');
    };

    return (
        <fieldset>
            <legend className="h1">Add ingredients</legend>
            <div>list</div>
            <div className="mb-5">
                <TextInput label="Ingredient" value={searchTerm} onChange={searchChanged} />
                <div className="flex flex-col my-3">
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
            <button className="btn-primary" onClick={handleAddIngredient} disabled={unit.length === 0 || amount === 0}>
                Add ingredient
            </button>
        </fieldset>
    );
};

export default AddIngredients;
