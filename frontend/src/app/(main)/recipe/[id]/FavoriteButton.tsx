'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';

export default function FavoriteButton({
    recipe,
    useAuthSession = useSession,
}: {
    recipe: Recipe;
    useAuthSession?: typeof useSession;
}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { data: session } = useAuthSession();
    const { favorites, add, remove } = useFavoriteStore();

    const handleFavorite = async (e: React.KeyboardEvent | React.MouseEvent) => {
        if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift')) return;
        if (isFavorite) {
            remove(recipe.id, session);
        } else {
            add(recipe, session);
        }
        setIsFavorite((isFavorite) => !isFavorite);
    };

    useEffect(() => {
        const fav = favorites.find((favorit: Recipe) => favorit.id == recipe.id);
        if (fav) setIsFavorite(true);
    }, [isFavorite, favorites, recipe]);

    return (
        <div
            className="w-1/4 flex justify-end items-center hover:fill-green-custom1 hover:cursor-pointer text-green-custom2 "
            style={{
                fill: isFavorite ? 'var(--green-dark)' : 'none',
            }}
            onClick={(e) => handleFavorite(e)}
            tabIndex={0}
            onKeyDown={(e) => handleFavorite(e)}
            data-testid="favorite-button"
        >
            <Icon size={50} icon="heart" classNames="w-10 lg:w-12" data-testid="heart"></Icon>
        </div>
    );
}
