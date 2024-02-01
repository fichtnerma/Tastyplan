'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import ReturnButton from '@components/common/ReturnButton';
import AddRecipeCard from '@components/AddRecipeCard/AddRecipeCard';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Recipe, Role } from 'src/types/types';

function OwnRecipes() {
    const { data: ownRecipes, error } = useFetchWithAuth('/service/recipes/own') as unknown as {
        data: Array<Recipe>;
        error: unknown;
    };
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <>
            <div className="mainContainer">
                <div className="flex">
                    <ReturnButton />
                    <h1 className="mt-auto mb-auto ml-5">
                        {user?.role === Role.user ? user?.userId + "'s" : 'Your'} Recipes
                    </h1>
                </div>
                <AddRecipeCard />
                {!error && ownRecipes ? (
                    <div className="flex gap-12 flex-wrap">
                        {ownRecipes.map((recipe: Recipe) => {
                            return (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    highlighted={false}
                                    withSwitch={false}
                                    smallCard={false}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>loading</div>
                )}
            </div>
        </>
    );
}

export default OwnRecipes;
