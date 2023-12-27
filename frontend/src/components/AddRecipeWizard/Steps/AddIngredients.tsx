import { useState } from 'react';
import IngredientSearch, { IngredientOption } from '@components/IngredientSearch/IngredientSearch';
import IngredientList from '@components/IngredientList/IngredientList';
import TextInput from '@components/FormInputs/TextInput';
import NumberInput from '@components/FormInputs/NumberInput';
import DialogModal from '@components/DialogModal/DialogModal';
import { Ingredient } from 'src/types/types';

type AddIngredientsProps = {
    currentIngredients: Ingredient[];
    onAddIngredient: (ingredients: Ingredient) => void;
};

const AddIngredients = ({ currentIngredients, onAddIngredient }: AddIngredientsProps) => {
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientOption | undefined>(undefined);
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('');
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

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
            <label htmlFor="selectIngredient">Search ingredient</label>
            <IngredientSearch id="selectedIngredient" onIngredient={setSelectedIngredient} />
            <div className="mb-5">
                <div className="flex flex-col my-3">
                    <label htmlFor="amount">Amount</label>
                    <NumberInput value={amount} required id="amount" min={0} onChange={(value) => setAmount(value)} />
                </div>
                <TextInput label="Unit" value={unit} onChange={setUnit} required />
            </div>
            <div className="flex justify-between">
                <button
                    className="btn-primary"
                    onClick={handleAddIngredient}
                    disabled={unit.length === 0 || amount === 0 || selectedIngredient === undefined}
                >
                    Add ingredient
                </button>
                <button
                    className="btn-primary"
                    onClick={() => setDialogIsOpen(true)}
                    disabled={currentIngredients.length <= 0}
                >
                    Ingredients
                </button>
            </div>
            <DialogModal isOpened={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                <IngredientList isInteractive={false} ingredients={currentIngredients} />
            </DialogModal>
        </fieldset>
    );
};

export default AddIngredients;
