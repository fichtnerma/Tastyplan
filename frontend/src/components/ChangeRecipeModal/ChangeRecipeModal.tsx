import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import Icon from '@components/Icon/Icon';
import DialogModal from '@components/DialogModal/DialogModal';
import { fetchWithAuth } from '@helpers/utils';
import { Recipe } from 'src/types/types';

type ChangRecipeModalProps = {
    open: boolean;
    setIsOpened: (x: boolean) => void;
    entryId?: string;
    refresh?: (recipe: Recipe | undefined) => void;
    isLunch: boolean;
    recipeId?: number;
};

function ChangeRecipeModal({ open, setIsOpened, entryId, refresh, isLunch, recipeId }: ChangRecipeModalProps) {
    const [newRecipe, setNewRecipe] = useState(false);
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const { data: session } = useSession();

    useEffect(() => {
        async function getRecipes() {
            setRecipes([]);
            const data = await fetchWithAuth(`/service/recipes/recommend/${recipeId}`, { method: 'GET' }, session);
            const recipesData = (await data.json()) as Array<Recipe>;
            setRecipes(recipesData);
        }
        if (open) {
            getRecipes();
        }
    }, [open, session, newRecipe, recipeId]);

    const switchRecipe = async (recipeId: number | null) => {
        setIsOpened(false);
        const changedRecipe = { id: recipeId, weekplanEntry: entryId, isLunch: isLunch, isDinner: !isLunch };
        const recipeRes = await fetchWithAuth(
            '/service/weekplan/changeRecipe',
            { method: 'POST', body: JSON.stringify(changedRecipe) },
            session,
        );
        let recipe: Recipe | undefined = undefined;
        try {
            recipe = await recipeRes.json();
        } catch (e) {}

        if (refresh) {
            refresh(recipe);
        }
    };

    return (
        <>
            <DialogModal
                title="Choose a new recipe"
                buttonClose="I take the original recipe"
                buttonProceed="No recipe for this mealtime"
                isOpened={open}
                onProceed={() => switchRecipe(null)}
                onClose={() => setIsOpened(false)}
            >
                <>
                    <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 gap-4 lg:min-w-[980px] lg:min-h-[325px] pt-5 pb-20">
                        {recipes &&
                            recipes.map((recipeInfo: Recipe) => {
                                return (
                                    <div key={recipeInfo.id}>
                                        <RecipeCard
                                            recipe={recipeInfo}
                                            highlighted={false}
                                            withSwitch={false}
                                            smallCard={true}
                                            switchRecipe={() => switchRecipe(recipeInfo.id)}
                                        />
                                    </div>
                                );
                            })}
                        <button
                            className="m-auto text-green-custom2 px-5 hover:text-green-custom3 relative z-10"
                            onClick={() => {
                                setNewRecipe(!newRecipe);
                            }}
                            data-cy="exchange-recipes-btn"
                        >
                            <Icon size={40} icon="switch"></Icon>
                        </button>
                    </div>
                </>
            </DialogModal>
        </>
    );
}

export default ChangeRecipeModal;
