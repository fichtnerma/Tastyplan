'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import Icon from '@components/Icon/Icon';
import ReturnButton from '@components/common/ReturnButton';
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
                <Link
                    className="flex justify-center flex-col rounded-custom_s relative w-full h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[200px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2 hover:text-green-custom3"
                    href="/addRecipe"
                >
                    <div>
                        <Icon size={50} icon="addCircle"></Icon>
                    </div>
                    <h5 className="text-inherit pt-5 m-0">add your</h5>
                    <h5 className="text-inherit m-0 leading-none">own recipe</h5>
                </Link>
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
