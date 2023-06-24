import { Session } from 'next-auth';
import { create } from 'zustand';
import { fetchWithAuth } from '@helpers/utils';
import { Recipe } from 'src/types/types';

interface FavoriteState {
    favorites: Recipe[];
    add: (item: Recipe, session: Session | null) => void;
    remove: (recipeId: number, session: Session | null) => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => {
    return {
        favorites: [],
        add: (recipe, session) => {
            fetchWithAuth(
                '/service/favorites/add',
                {
                    method: 'POST',
                    body: JSON.stringify({ recipeId: recipe.id }),
                },
                session,
            );
            set((state) => ({ favorites: [...state.favorites, recipe] }));
        },
        remove: (recipeId, session) => {
            fetchWithAuth(
                '/service/favorites/add',
                {
                    method: 'POST',
                    body: JSON.stringify({ recipeId: recipeId }),
                },
                session,
            );
            set((state) => ({ favorites: state.favorites.filter((fav) => fav.id !== recipeId) }));
        },
    };
});
