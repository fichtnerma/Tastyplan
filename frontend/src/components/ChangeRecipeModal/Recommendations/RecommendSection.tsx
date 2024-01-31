import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import Icon from '@components/Icon/Icon';
import { fetchWithAuth } from '@helpers/utils';
import { Recipe } from 'src/types/types';

type RecommendSectionProps = {
    isActive: boolean;
    recipeId: number | undefined;
};

export default function RecommendSection({ isActive, recipeId }: RecommendSectionProps) {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const { data: session } = useSession();
    useEffect(() => {
        if (isActive) getRecipes();
    }, [isActive]);

    async function getRecipes() {
        setRecipes([]);
        const data = await fetchWithAuth(`/service/recipes/recommend/${recipeId}`, { method: 'GET' }, session);
        const recipesData = (await data.json()) as Array<Recipe>;
        setRecipes(recipesData);
    }

    return (
        <>
            <div className="flex justify-start items-center pt-4 text-black ">
                <h4 className="h4 text-center !mb-0 !sm:mb-1">Recipes for you</h4>
                <button
                    className="px-3 h:4 sm:h-10 hover:text-green-custom2  z-10"
                    onClick={() => {
                        getRecipes();
                    }}
                    aria-label="switch recipes"
                    onKeyDown={(e) => {
                        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift')) return;
                        getRecipes();
                    }}
                >
                    <Icon classNames="w-4 h-4 sm:w-6 sm:h-6" icon="switch"></Icon>
                </button>
            </div>

            <div className="recipeCardGrid">
                {recipes?.length > 0
                    ? recipes.map((recipeInfo: Recipe) => {
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
                    : null}
            </div>
        </>
    );
}
