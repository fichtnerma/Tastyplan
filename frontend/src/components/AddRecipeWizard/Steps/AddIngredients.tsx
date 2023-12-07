import { useState } from 'react';
import IngredientSearch, { SelectOption } from '@components/IngredientSearch/IngredientSearch';
import TextInput from '@components/FormInputs/TextInput';
import { Ingredient } from 'src/types/types';

type AddIngredientsProps = {
    onAddIngredient: (ingredients: Ingredient) => void;
};

const AddIngredients = ({ onAddIngredient }: AddIngredientsProps) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('');

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selectedOption === undefined) return;
        onAddIngredient({
            id: selectedOption.id,
            ingredient: { name: selectedOption.value },
            quantity: amount,
            unit,
        });

        setSelectedOption(undefined);
        setAmount(1);
        setUnit('');
    };

    return (
        <fieldset>
            <legend className="h1">Add ingredients</legend>
            <div>list</div>
            <IngredientSearch onSelectOption={setSelectedOption} />
            <div className="mb-5">
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
            <button
                className="btn-primary"
                onClick={handleAddIngredient}
                disabled={unit.length === 0 || amount === 0 || selectedOption === undefined}
            >
                Add ingredient
            </button>
        </fieldset>
    );
};

export default AddIngredients;
