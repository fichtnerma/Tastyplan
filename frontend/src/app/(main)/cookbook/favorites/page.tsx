'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import ReturnButton from '@components/common/ReturnButton';
import { useFavoriteStore } from '@hooks/useFavorites';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Recipe, Role } from 'src/types/types';

function Favorites() {
    const { data, error } = useFetchWithAuth('/service/favorites');
    const { data: session } = useSession();
    const user = session?.user;
    const { favorites } = useFavoriteStore();

    return (
        <>
            <div className="mainContainer">
                <div className="flex">
                    <ReturnButton />
                    <h1 className="mt-auto mb-auto ml-5">
                        {user?.role === Role.user ? user?.userId + "'s" : 'Your'} Favorites
                    </h1>
                </div>

                {!error && data ? (
                    <div className="flex gap-12 flex-wrap">
                        {favorites.length == 0 ? (
                            <div>
                                <p>I haven't added any favorites yet.</p>
                                <p>To add one, simply click on the heart icon.</p>
                            </div>
                        ) : (
                            favorites.map((favorite: Recipe) => {
                                return (
                                    <RecipeCard
                                        key={favorite.id}
                                        recipe={favorite}
                                        highlighted={false}
                                        withSwitch={false}
                                        smallCard={false}
                                    />
                                );
                            })
                        )}
                    </div>
                ) : (
                    <div>loading</div>
                )}
            </div>
        </>
    );
}

export default Favorites;
