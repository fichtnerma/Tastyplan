import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
import { fetchWithAuth, mapShoppingListToSelection } from '@helpers/utils';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { CategorizedIngredients, CustomSelectionInput, CustomSelectionInputGroups } from 'src/types/types';

function ShoppingListPage() {
    const { data, error } = useFetchWithAuth<CategorizedIngredients>('/service/shopping-list');
    const [neededIngredients, setNeededIngredients] = useState<CustomSelectionInputGroups>({});
    const [presentIngredients, setPresentIngredients] = useState<CustomSelectionInputGroups>({});
    const { data: session } = useSession();

    useEffect(() => {
        if (data) {
            filterIngredients(data);
        }
    }, [data, error]);

    const sendIngredient = async (ingredient: CustomSelectionInput, category: string) => {
        // const foundElement = data?.find((el) => el.ingredientId + '' === ingredient.id);
        // if (!foundElement) return;

        console.log(category);

        if (!data) return;

        const foundElement = data[category].find((el) => el.ingredientId + '' === ingredient.id);

        if (!foundElement) return;

        console.log('id', foundElement.id);
        console.log('ingredientId', foundElement.ingredientId);

        console.log(foundElement.id);
        const dataToSend = {
            isChecked: ingredient.checked,
        };
        fetchWithAuth(
            `/service/shopping-list/update/${foundElement.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            },
            session,
        );
    };

    const filterIngredients = (categorizedIngredients: CategorizedIngredients) => {
        const neededIngredients: CategorizedIngredients = {};
        const presentIngredients: CategorizedIngredients = {};
        const selectionInputGroupsNeeded: CustomSelectionInputGroups = {};
        const selectionInputGroupsPresent: CustomSelectionInputGroups = {};

        for (const [key, ingredients] of Object.entries(categorizedIngredients)) {
            neededIngredients[key] = ingredients.filter((ingredient) => !ingredient.isChecked);
            presentIngredients[key] = ingredients.filter((ingredient) => ingredient.isChecked);
            selectionInputGroupsNeeded[key] = mapShoppingListToSelection(neededIngredients[key]);
            selectionInputGroupsPresent[key] = mapShoppingListToSelection(presentIngredients[key]);
        }

        setNeededIngredients(selectionInputGroupsNeeded);
        setPresentIngredients(selectionInputGroupsPresent);
    };

    const handleNeededSelect = (id: string) => {
        const filteredNeededIngredients: CustomSelectionInputGroups = {};
        let foundIngredient: CustomSelectionInput | undefined = undefined;
        let category = '';

        for (const [key, ingredients] of Object.entries(neededIngredients)) {
            filteredNeededIngredients[key] = ingredients.filter((ingredient) => ingredient.id !== id);

            if (!foundIngredient) {
                foundIngredient = ingredients.find((ingredient) => {
                    if (ingredient.id === id) {
                        category = key;
                        return true;
                    }
                });
            }
        }

        if (foundIngredient) {
            foundIngredient.checked = true;
            const presentIngredientsCopy = { ...presentIngredients };
            presentIngredientsCopy[category].push(foundIngredient);
            setPresentIngredients(presentIngredientsCopy);
            sendIngredient(foundIngredient, category);
        }

        setNeededIngredients(filteredNeededIngredients);
    };

    const handlePresentSelect = (id: string) => {
        const filteredPresentIngredients: CustomSelectionInputGroups = {};
        let foundIngredient: CustomSelectionInput | undefined = undefined;
        let category = '';

        for (const [key, ingredients] of Object.entries(neededIngredients)) {
            filteredPresentIngredients[key] = ingredients.filter((ingredient) => ingredient.id !== id);

            if (!foundIngredient) {
                foundIngredient = ingredients.find((ingredient) => {
                    if (ingredient.id === id) {
                        category = key;
                        return ingredient;
                    }
                });
            }
        }

        if (foundIngredient) {
            foundIngredient.checked = false;
            const neededIngredientsCopy = { ...neededIngredients };
            neededIngredientsCopy[category].push(foundIngredient);
            setNeededIngredients(neededIngredientsCopy);
            sendIngredient(foundIngredient, category);
        }

        setPresentIngredients(filteredPresentIngredients);
    };

    return (
        <div className="pt-[4rem] px-4 sm:pt-[6rem] md:pt-[9rem] lg:pt-[6rem]">
            <h1 className="text-green-custom2">Your shopping list:</h1>
            <div className="">
                <div className="">
                    <h2>Things you need:</h2>
                    {neededIngredients &&
                        Object.entries(neededIngredients).map((key) => {
                            return (
                                <div key={key[0]}>
                                    <h3>{key[0]}</h3>
                                    <CheckboxGroup
                                        checkboxes={key[1]}
                                        groupName={key[0]}
                                        onCheckboxSelect={handleNeededSelect}
                                        disabled={false}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div>
                    <h2>Things you already have:</h2>
                    {presentIngredients &&
                        Object.entries(presentIngredients).map((key) => {
                            return (
                                <div key={key[0]}>
                                    <h3>{key[0]}</h3>
                                    <CheckboxGroup
                                        checkboxes={key[1]}
                                        groupName={key[0]}
                                        onCheckboxSelect={handlePresentSelect}
                                        disabled={false}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default ShoppingListPage;
