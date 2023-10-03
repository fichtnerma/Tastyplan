'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { useFavoriteStore } from '@hooks/useFavorites';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Recipe, Role } from 'src/types/types';

function Cookbook() {
    const { data, error } = useFetchWithAuth('/service/favorites');
    const { data: session } = useSession();
    const user = session?.user;
    const { favorites } = useFavoriteStore();

    return (
        <>
            <div className="p-6 md:p-14 md:pt-24 lg:max-w-[1920px]">
                <h1>{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Cookbook</h1>
                {!error && data ? (
                    <div className="flex gap-12 flex-wrap">
                        {favorites.map((favorite: Recipe) => {
                            return (
                                <RecipeCard
                                    key={favorite.id}
                                    recipe={favorite}
                                    highlighted={false}
                                    switchCard={false}
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

export default Cookbook;
