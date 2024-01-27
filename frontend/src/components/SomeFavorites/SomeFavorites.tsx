'use client';
import React from 'react';
import Link from 'next/link';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import Icon from '@components/Icon/Icon';
import { useFavoriteStore } from '@hooks/useFavorites';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Recipe } from 'src/types/types';

function SomeFavorites() {
    const { data, error } = useFetchWithAuth('/service/favorites');
    const { favorites } = useFavoriteStore();

    return (
        <>
            <h2 className="h4">Some of your all-Time-Favorites</h2>
            <div className="flex gap-12 overflow-x-auto overflow-y-hidden pb-5 mb-5">
                <Link
                    className="flex justify-center rounded-custom_s relative !w-[150px] h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[200px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2 hover:text-green-custom3"
                    href="/addRecipe"
                >
                    <span className="md:!w-[200px] !w-[150px] flex flex-col justify-center items-center">
                        <span>
                            <Icon size={50} icon="addCircle"></Icon>
                        </span>
                        <h5 className="text-inherit pt-5 m-0">add your</h5>
                        <h5 className="text-inherit m-0 leading-none">own recipe</h5>
                    </span>
                </Link>
                {!error && data ? (
                    <div className="flex gap-12 flex-nowrap">
                        {favorites.slice(0, 3).map((favorite: Recipe) => {
                            return (
                                <RecipeCard
                                    key={favorite.id}
                                    recipe={favorite}
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

export default SomeFavorites;
