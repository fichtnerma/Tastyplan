import AsyncSelect from 'react-select/async';
import { APISearchResponse } from 'src/types/types';
import { Option } from 'src/types/types';

export type IngredientOption = {
    id: number;
    value: string;
    label: string;
};

type IngredientSearchProps = {
    id: string;
    onIngredient: (ingredient: IngredientOption) => void;
};

const IngredientSearch = ({ onIngredient, id }: IngredientSearchProps) => {
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
            cacheOptions
            // @ts-ignore
            loadOptions={ingredientOptions}
            //@ts-ignore
            onChange={onIngredient}
        />
    );
};

export default IngredientSearch;
