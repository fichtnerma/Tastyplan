import { useEffect, useState } from 'react';
import CheckboxGroup from '@components/FormInputs/CheckboxGroup/CheckboxGroup';
import { mapShoppingListToSelection } from '@helpers/utils';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { CustomSelectionInput, ShoppingListItem } from 'src/types/types';

function ShoppingListPage() {
    const { data, error } = useFetchWithAuth<ShoppingListItem[]>('/service/shopping-list');
    const [neededIngredients, setNeededIngredients] = useState<CustomSelectionInput[]>([]);
    const [presentIngredients, setPresentIngredients] = useState<CustomSelectionInput[]>([]);

    useEffect(() => {
        if (data) filterIngredients(data);
    }, [data, error]);

    const filterIngredients = (ingredients: ShoppingListItem[]) => {
        const neededIngredients = ingredients.filter((ingredient) => !ingredient.isChecked);
        setNeededIngredients(mapShoppingListToSelection(neededIngredients));

        const presentIngredients = ingredients.filter((ingredient) => ingredient.isChecked);
        setPresentIngredients(mapShoppingListToSelection(presentIngredients));
    };

    const handleNeededSelect = (id: string) => {
        const filteredNeededIngredients = neededIngredients.filter((ingredient) => ingredient.id !== id);
        const foundIngredient = neededIngredients.find((ingredient) => ingredient.id === id);
        if (foundIngredient) {
            foundIngredient.checked = true;
            const presentIngredientsCopy = [...presentIngredients];
            presentIngredientsCopy.push(foundIngredient);
            setPresentIngredients(presentIngredientsCopy);
        }
        setNeededIngredients(filteredNeededIngredients);
    };

    const handlePresentSelect = (id: string) => {
        const filteredPresentIngredients = presentIngredients.filter((ingredient) => ingredient.id !== id);

        const foundIngredient = presentIngredients.find((ingredient) => ingredient.id === id);

        if (foundIngredient) {
            foundIngredient.checked = false;
            const neededIngredientsCopy = [...neededIngredients];
            neededIngredientsCopy.push(foundIngredient);
            setNeededIngredients(neededIngredientsCopy);
        }
        setPresentIngredients(filteredPresentIngredients);
    };

    return (
        <div>
            <h1 className="h1-green">Your shopping list:</h1>
            <div className="flex w-full">
                <div className="mr-[20rem]">
                    <h2>Things you need:</h2>
                    {data && (
                        <CheckboxGroup
                            checkboxes={neededIngredients}
                            groupName="ingredients2"
                            onCheckboxSelect={handleNeededSelect}
                            disabled={false}
                        />
                    )}
                </div>
                <div>
                    <h2>Things you already have:</h2>
                    <CheckboxGroup
                        checkboxes={presentIngredients}
                        groupName="ingredients2"
                        onCheckboxSelect={handlePresentSelect}
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    );
}
// type Data = { test: 'normal' };

// export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
//     // const session = (await getServerSession(context.req, context.res, authOptions)) as Session;
//     // // const res = await fetchWithAuth('/service/shopping-list', undefined, session);
//     // // const res = await fetch('https://.../data');
//     // // const data: Data = await res.json();

//     // console.log(session.user.firstName);

//     // return {
//     //     props: {
//     //         hello: 'hello',
//     //     },
//     // };
// };

export default ShoppingListPage;
