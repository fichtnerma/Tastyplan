import React from 'react';
import { useSession } from 'next-auth/react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Favorite, Role } from 'src/types/types';

function Cookbook() {
    const { data, error } = useFetchWithAuth('/service/favorites');
    const { data: session } = useSession();
    const user = session?.user;
    const favorites = data as Favorite[];

    return (
        <>
            <div className="p-6 md:p-14 md:pt-36 lg:max-w-[1920px]">
                <h1>{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Cookbook</h1>
                {!error && data ? (
                    <div className="flex gap-12 flex-wrap">
                        {favorites.map((favorite: Favorite) => {
                            return <RecipeCard key={favorite.recipeId} recipe={favorite.recipe} highlighted={false} />;
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
