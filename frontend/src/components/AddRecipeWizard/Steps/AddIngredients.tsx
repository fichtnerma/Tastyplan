import { useCallback, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import IngredientSearch, { IngredientOption } from '@components/IngredientSearch/IngredientSearch';
// import IngredientList from '@components/IngredientList/IngredientList';
import 'react-toastify/dist/ReactToastify.css';
import Icon from '@components/Icon/Icon';
import NumberInput from '@components/FormInputs/NumberInput';
// import DialogModal from '@components/DialogModal/DialogModal';
import { Ingredient } from 'src/types/types';
import { selectStyleOptions } from './Keyfacts';

type AddIngredientsProps = {
    currentIngredients: Ingredient[];
    onChangeIngredients: (ingredients: Ingredient[]) => void;
};

type UnitOption = {
    value: string;
    label: string;
};

const selectUnitOptions: UnitOption[] = [
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'l', label: 'l' },
    { value: 'ml', label: 'ml' },
    { value: 'tbsp', label: 'tbsp' },
    { value: 'can', label: 'can' },
    { value: 'cup', label: 'cup' },
    { value: 'cloves', label: 'cloves' },
    { value: '', label: '-' },
];

const defaultUnit = {
    label: '',
    value: '-',
};

const AddIngredients = ({ currentIngredients, onChangeIngredients }: AddIngredientsProps) => {
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientOption | undefined>(undefined);
    const [amount, setAmount] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState<UnitOption | undefined>(defaultUnit);
    const [ingredients, setIngredients] = useState<Ingredient[]>(currentIngredients);
    // const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (selectedIngredient === undefined) return;

        const currentIngredients = [...ingredients];

        const itemAlreadyExists = currentIngredients.some((ingredient) => ingredient.id === selectedIngredient.id);

        if (itemAlreadyExists) {
            setSelectedIngredient(undefined);
            setAmount(1);
            setSelectedUnit(undefined);
            toast.error('Ingredient is already added. Pls remove to change unit and quantity');
            return;
        }

        currentIngredients.push({
            id: selectedIngredient.id,
            ingredient: { name: selectedIngredient.value },
            quantity: amount,
            unit: selectedUnit ? selectedUnit.value : defaultUnit.value,
        });
        setIngredients(currentIngredients);
        onChangeIngredients(currentIngredients);

        setSelectedIngredient(undefined);
        setAmount(1);
        setSelectedUnit(defaultUnit);
    };

    const handleUnitChange = (selectedOption: unknown | undefined) => {
        if (!selectedOption) return;

        const typedOption = selectedOption as UnitOption;
        setSelectedUnit(typedOption);
    };

    const handleItemRemove = useCallback(
        (id: number) => {
            const currentIngredients = [...ingredients];
            const filteredIngredients = currentIngredients.filter((ingredient) => ingredient.id !== id);
            setIngredients(filteredIngredients);
            onChangeIngredients(filteredIngredients);
        },
        [ingredients, onChangeIngredients],
    );

    const handleDelete = (id: number | undefined) => {
        if (!id || !handleItemRemove) return;
        handleItemRemove(id);
    };

    return (
        <fieldset className="overflow-x-auto h-full">
            <legend className="h3">Add ingredients</legend>
            <div className=" pb-8 p-2 pt-0">
                <div className="flex gap-5 flex-wrap mb-5">
                    {ingredients.map((ingredient) => (
                        <>
                            <div className="btn-primary-unobtrusive btn-small !items-center !flex gap-1">
                                <strong>
                                    {ingredient.quantity} {ingredient.unit}
                                </strong>{' '}
                                {ingredient.ingredient?.name}
                                <button onClick={() => handleDelete(ingredient.id)} className="my-auto">
                                    <Icon icon="close"></Icon>
                                </button>
                            </div>
                        </>
                    ))}
                </div>
                <div className="flex flex-wrap w-full gap-5">
                    <div className="flex flex-col w-full lg:w-1/2">
                        <label htmlFor="selectIngredient">Search ingredient *</label>
                        <IngredientSearch
                            id="selectedIngredient"
                            selectedOption={selectedIngredient}
                            onIngredient={setSelectedIngredient}
                        />
                    </div>
                    <div className="w-full lg:w-1/12">
                        <NumberInput
                            value={amount}
                            label="Amount"
                            required={true}
                            id="amount"
                            min={0}
                            onChange={(value) => setAmount(value)}
                        />
                    </div>
                    <div className="flex flex-col w-full lg:w-1/4">
                        <label htmlFor="unit">Unit *</label>
                        <Select
                            name="unit"
                            value={{
                                label: selectedUnit ? selectedUnit.label : '',
                                value: selectedUnit ? selectedUnit.value : '',
                            }}
                            id="unit"
                            aria-label="unit"
                            aria-labelledby="unit"
                            onChange={handleUnitChange}
                            options={selectUnitOptions}
                            styles={selectStyleOptions}
                        />
                    </div>
                    <button
                        className="btn-primary !p-4 h-fit my-auto"
                        onClick={handleAddIngredient}
                        disabled={!selectedUnit || amount === 0 || selectedIngredient === undefined}
                    >
                        <Icon icon="check" size={20}></Icon>
                    </button>
                </div>
                {/* <div className="flex justify-between">
                    <button
                        className="btn-primary"
                        onClick={() => setDialogIsOpen(true)}
                        disabled={ingredients.length <= 0}
                    >
                        Ingredients
                    </button>
                </div>
                <DialogModal isOpened={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                    <IngredientList isItemRemovable={true} ingredients={ingredients} onItemRemove={handleItemRemove} />
                </DialogModal> */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    limit={1}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </fieldset>
    );
};

export default AddIngredients;
