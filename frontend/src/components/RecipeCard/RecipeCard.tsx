'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import ChangeRecipeModal from '@components/ChangeRecipeModal/ChangeRecipeModal';
import { getFormOfDietIcon } from '@helpers/utils';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
    recipe: Recipe;
    highlighted: boolean;
    switchCard: boolean;
};

function RecipeCard({ recipe, highlighted, switchCard }: RecipeCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const { data: session } = useSession();
    const { favorites, add, remove } = useFavoriteStore();
    useEffect(() => {
        const fav = favorites.find((favorit: Recipe) => favorit.id == recipe.id);
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

    const openModal = () => {
        setIsOpened(true);
        // console.log(isOpened);
    };

    return (
        <>
            <div className={styles.wrapperContainer}>
                <div
                    className={`justify-end ${highlighted ? styles.icon__highlighted : styles.icon__notHighlighted} ${
                        isFavorite ? styles.icon__favorite : 'none'
                    } flex p-1 top-[10px] text-white-custom right-2 rounded-full cursor-pointer absolute fill-none z-10 bg-green-custom2 
                        transition-all duration-600 ease-in-out hover:bg-green-custom3 ${styles.icon}`}
                    onClick={() => handleFavorite()}
                >
                    <Icon size={15} icon="heart"></Icon>
                </div>

                <div
                    className={`justify-end ${highlighted ? styles.icon__highlighted : styles.icon__notHighlighted}
                    ${switchCard ? 'block' : 'hidden'}
            
                    flex p-1 top-[10px] text-white-custom right-8 rounded-full cursor-pointer absolute z-10 bg-green-custom2  transition-all duration-600 ease-in-out ${
                        styles.icon
                    }`}
                    onClick={() => openModal()}
                >
                    <Icon size={15} icon="switch"></Icon>
                </div>
                <ChangeRecipeModal open={isOpened}></ChangeRecipeModal>
                <Link className="block h-full" href={`/recipe/${recipe.id}`}>
                    <div className={` w-full h-full absolute rounded-custom_s ${styles.foodBox}`}>
                        <Image
                            src={`/service/images/${recipe.img}`}
                            width={200}
                            height={200}
                            alt="Food Img"
                            className={`w-full h-full object-cover rounded-custom_s z-[-5] transition-opacity duration-600 ease-in-out ${styles.foodImg}`}
                        />
                    </div>
                    <div
                        className={` w-full h-full flex flex-col-reverse rounded-custom_s relative overflow-hidden ${
                            highlighted ? `${styles.weekplanBox} ${styles.weekplanBoxToday}` : styles.weekplanBox
                        }`}
                    >
                        <div
                            className={`absolute p-2 transition-bottom duration-600 ease-in-out h-auto w-full ${styles.discriptionFood}`}
                        >
                            <div className="">
                                <div className="w-full col-span-4">
                                    <div
                                        className="p-big leading-5 !mb-0 w-4/5 sm:w-[140px] lg:w-[160px] recipeName"
                                        style={{
                                            color: highlighted ? 'var(--white)' : 'var(--black)',
                                        }}
                                    >
                                        {recipe.name}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out absolute mt-0 w-[240px] ${styles.discriptionHover}`}
                                style={{
                                    color: highlighted ? 'var(--white)' : 'var(--black)',
                                }}
                            >
                                {recipe.formOfDiet !== null && (
                                    <div className="flex flex-row gap-x-2 mt-4">
                                        <Icon size={20} icon={getFormOfDietIcon(recipe?.formOfDiet)}></Icon>
                                        <p
                                            className="text-base text-center my-auto"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {recipe.formOfDiet}
                                        </p>
                                    </div>
                                )}
                                {totalTime !== (null || 0) && (
                                    <div className="flex flex-row gap-x-2 mt-4">
                                        <Icon size={20} icon="totaltime"></Icon>
                                        <p
                                            className="text-base my-auto text-center"
                                            style={{
                                                color: highlighted ? 'var(--white)' : 'var(--black)',
                                            }}
                                        >
                                            {totalTime} min
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
