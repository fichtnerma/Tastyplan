'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';

export default function FavoriteButton({ recipe }: { recipe: Recipe }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { data: session } = useSession();
    const { favorites, add, remove } = useFavoriteStore();

    const handleFavorite = async () => {
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
            onClick={() => handleFavorite()}
            tabIndex={0}
        >
            <Icon size={50} icon="heart" classNames="w-10 lg:w-12"></Icon>
        </div>
    );
}
