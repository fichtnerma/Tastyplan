import AsyncSelect from 'react-select/async';
import { selectStyleOptions } from '@components/AddRecipeWizard/Steps/Keyfacts';
import { APISearchResponse } from 'src/types/types';
import { Option } from 'src/types/types';

export type IngredientOption = {
    id: number;
    value: string;
    label: string;
};

type IngredientSearchProps = {
    id: string;
    selectedOption: IngredientOption | undefined;
    onIngredient: (ingredient: IngredientOption) => void;
};

const IngredientSearch = ({ onIngredient, selectedOption, id }: IngredientSearchProps) => {
    const ingredientOptions = async (inputValue: string, callback: (options: Option[]) => void) => {
        const res = await fetch(`/service/ingredients?search=${inputValue}`);
        if (!res.ok) callback([]);
        const data = (await res.json()) as APISearchResponse[];
        const options: IngredientOption[] = data.map((ingredient) => {
            return {
                id: ingredient.id,
                label: ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1),
                value: ingredient.name,
            };
        });

        callback(options);
    };
    return (
        <AsyncSelect
            id={id}
            value={{
                label: selectedOption ? selectedOption.label : '',
                value: selectedOption ? selectedOption.value : '',
            }}
            cacheOptions
            // @ts-ignore
            styles={selectStyleOptions}
            // @ts-ignore
            loadOptions={ingredientOptions}
            //@ts-ignore
            onChange={onIngredient}
        />
    );
};

export default IngredientSearch;
