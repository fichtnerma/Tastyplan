import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { fetchWithAuth } from '@helpers/utils';
import { Recipe } from 'src/types/types';

type SearchSectionProps = {
    searchQuery: string;
};

export default function SearchSection({ searchQuery }: SearchSectionProps) {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const { data: session } = useSession();

    useEffect(() => {
        async function searchForRecipes() {
            setRecipes([]);
            const data = await fetchWithAuth(`/service/recipes?search=${searchQuery}`, { method: 'GET' }, session);
            const recipesData = (await data.json()) as Array<Recipe>;
            setRecipes(recipesData);
        }
        if (searchQuery) searchForRecipes();
    }, [searchQuery, session]);

    return (
        <div className="pt-6">
            <h4 className="h3 text-start w-full !mb-0 !sm:mb-1">Found Recipes</h4>
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
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
