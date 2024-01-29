import RecipeCard from '@components/RecipeCard/RecipeCard';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';

export default function FavoritesSection() {
    const { favorites } = useFavoriteStore();

    return (
        <>
            <div className="flex justify-start pt-4">
                <h4 className="h4 text-center !mb-1 text-black">Favorites</h4>
            </div>

            <div className="recipeCardGrid">
                {favorites?.length > 0 ? (
                    favorites.map((recipeInfo: Recipe) => {
                        return (
                            <div className="recipeCardWrapper" key={recipeInfo.id}>
                                <RecipeCard
                                    recipe={recipeInfo}
                                    highlighted={false}
                                    withSwitch={false}
                                    smallCard={true}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <h3 className="text-center">No favorites yet.</h3>
                        <p className="text-center">Add some recipes to your favorites to see them here.</p>
                        <p>You can do this by clicking on the little hearth icon in the corner of the recipe</p>
                    </div>
                )}
            </div>
        </>
    );
}
