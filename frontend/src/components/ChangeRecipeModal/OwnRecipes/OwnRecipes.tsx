import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { fetchWithAuth } from '@helpers/utils';
import { Recipe } from 'src/types/types';

export default function OwnRecipeSection() {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const { data: session } = useSession();

    useEffect(() => {
        async function searchForRecipes() {
            setRecipes([]);
            const data = await fetchWithAuth(`/service/recipes?search=Cajun`, { method: 'GET' }, session);
            const recipesData = (await data.json()) as Array<Recipe>;
            setRecipes(recipesData);
        }
        if (session) searchForRecipes();
    }, [session]);

    return (
        <div className="pt-6">
            <h4 className="h3 text-start w-full !mb-0 !sm:mb-1">Found Recipes</h4>
            <div className="recipeCardGrid">
                {recipes &&
                    recipes.map((recipeInfo: Recipe) => {
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
                    })}
            </div>
        </div>
    );
}
