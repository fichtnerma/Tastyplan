import React from 'react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Recipe } from 'src/types/types';

type FavoriteData = {
    id: number;
    recipe: Recipe;
    recipeId: number;
    userId: string;
};

function Cookbook() {
    const { data, error } = useFetchWithAuth('/service/favorites');
    const favorites = data as FavoriteData[];

    console.log(data);

    return (
        <>
            {' '}
            {!error && data ? (
                <div>
                    <h1>Your Cookbook</h1>
                    {favorites.map((favorite: FavoriteData) => {
                        return <RecipeCard key={favorite.recipeId} recipe={favorite.recipe} highlighted={false} />;
                    })}
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
}

export default Cookbook;
