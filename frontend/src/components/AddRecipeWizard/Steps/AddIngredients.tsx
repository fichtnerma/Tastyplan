import { useState } from 'react';
import IngredientSearch, { IngredientOption } from '@components/IngredientSearch/IngredientSearch';
import TextInput from '@components/FormInputs/TextInput';
import NumberInput from '@components/FormInputs/NumberInput';
import { Ingredient } from 'src/types/types';

type AddIngredientsProps = {
    onAddIngredient: (ingredients: Ingredient) => void;
};

const AddIngredients = ({ onAddIngredient }: AddIngredientsProps) => {
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientOption | undefined>(undefined);
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('');

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selectedIngredient === undefined) return;
        onAddIngredient({
            id: selectedIngredient.id,
            ingredient: { name: selectedIngredient.value },
            quantity: amount,
            unit,
        });

        setSelectedIngredient(undefined);
        setAmount(1);
        setUnit('');
    };

    return (
        <fieldset>
            <legend className="h1">Add ingredients</legend>
            <div>list</div>
            <IngredientSearch onIngredient={setSelectedIngredient} />
            <div className="mb-5">
                <div className="flex flex-col my-3">
                    <label htmlFor="amount">Amount</label>
                    <NumberInput value={amount} required id="amount" min={0} onChange={(value) => setAmount(value)} />
                </div>
                <TextInput label="Unit" value={unit} onChange={setUnit} required />
            </div>
            <button
                className="btn-primary"
                onClick={handleAddIngredient}
                disabled={unit.length === 0 || amount === 0 || selectedIngredient === undefined}
            >
                Add ingredient
            </button>
        </fieldset>
    );
};

export default AddIngredients;
