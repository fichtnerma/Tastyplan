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

            <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 gap-4 lg:min-w-[980px] lg:min-h-[325px] pt-5 pb-20">
                {favorites &&
                    favorites.map((recipeInfo: Recipe) => {
                        return (
                            <div key={recipeInfo.id}>
                                <RecipeCard
                                    recipe={recipeInfo}
                                    highlighted={false}
                                    withSwitch={false}
                                    smallCard={true}
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
