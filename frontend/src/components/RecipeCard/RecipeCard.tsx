'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
    recipe: Recipe;
    highlighted: boolean;
};

function RecipeCard({ recipe, highlighted }: RecipeCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { data: session } = useSession();
    const { favorites, add, remove } = useFavoriteStore();

    useEffect(() => {
        const fav = favorites.find((favorit) => favorit.id === recipe.id);
        if (fav) setIsFavorite(true);
    }, [isFavorite, favorites, recipe]);

    const handleFavorite = async () => {
        if (isFavorite) {
            remove(recipe.id, session);
        } else {
            add(recipe, session);
        }
        setIsFavorite((isFavorite) => !isFavorite);
    };

    const totalTime = recipe.cookingTime
        ? recipe.preparingTime
            ? recipe.cookingTime + recipe.preparingTime
            : recipe.cookingTime
        : recipe.preparingTime
        ? recipe.preparingTime
        : 0;

    return (
        <>
            <div className={styles.wrapperContainer}>
                <div
                    className={`justify-end flex p-2 ${styles.heartIcon}`}
                    style={{
                        color: highlighted ? 'var(--white)' : 'var(--green-dark)',
                        fill: isFavorite ? (highlighted ? 'var(--white)' : 'var(--green-dark)') : 'none',
                    }}
                    onClick={() => handleFavorite()}
                >
                    <Icon size={30} icon="heart"></Icon>
                </div>
                <Link className="block h-full" href={`/recipe/${recipe.id}`}>
                    <div className={styles.foodBox}>
                        <Image
                            src={`/service/images/${recipe.img}`}
                            width={200}
                            height={200}
                            alt="Food Img"
                            className={styles.foodImg}
                        />
                    </div>
                    <div
                        className={
                            highlighted ? `${styles.weekplanBox} ${styles.weekplanBoxToday}` : styles.weekplanBox
                        }
                    >
                        <div className={styles.discriptionFood}>
                            <div className="">
                                <div className="w-full col-span-4">
                                    <p
                                        className="h5 !mb-0 w-4/5 sm:w-[140px] lg:w-[210px] recipeName"
                                        style={{
                                            color: highlighted ? 'var(--white)' : 'var(--black)',
                                        }}
                                    >
                                        {recipe.name}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={styles.discriptionHover}
                                style={{
                                    color: highlighted ? 'var(--white)' : 'var(--black)',
                                }}
                            >
                                {totalTime !== (null || 0) && (
                                    <div className="flex flex-row gap-x-4 mt-4">
                                        <Icon size={25} icon="totaltime"></Icon>
                                        <p
                                            className="text-lg my-auto text-center"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {totalTime} min
                                        </p>
                                    </div>
                                )}
                                {recipe.preparingTime !== (null || 0) && (
                                    <div className="flex flex-row gap-x-4 mt-4">
                                        <Icon size={25} icon="preparingTime"></Icon>
                                        <p
                                            className="text-lg my-auto text-center"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {recipe.preparingTime} min
                                        </p>
                                    </div>
                                )}
                                {recipe.cookingTime !== (null || 0) && (
                                    <div className="flex flex-row gap-x-4 mt-4">
                                        <Icon size={25} icon="cookingTime"></Icon>
                                        <p
                                            className="text-lg text-center my-auto"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {recipe.cookingTime} min
                                        </p>
                                    </div>
                                )}
                                {recipe.formOfDiet !== null && (
                                    <div className="flex flex-row gap-x-4 mt-4">
                                        <Icon size={25} icon={getFormOfDietIcon(recipe?.formOfDiet)}></Icon>
                                        <p
                                            className="text-lg text-center my-auto"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {recipe.formOfDiet}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default RecipeCard;
