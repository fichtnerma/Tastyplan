'use client';
import React from 'react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import AddRecipeCard from '@components/AddRecipeCard/AddRecipeCard';
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
                <AddRecipeCard />
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
