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
                <h4 className="h4 text-center !mb-0 !sm:mb-1">Recommended recipes</h4>
                <button
                    className="px-3 h:4 sm:h-10 hover:text-green-custom2  z-10"
                    onClick={() => {
                        getRecipes();
                    }}
                >
                    <Icon classNames="w-4 h-4 sm:w-6 sm:h-6" icon="switch"></Icon>
                </button>
            </div>

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
        </>
    );
}
