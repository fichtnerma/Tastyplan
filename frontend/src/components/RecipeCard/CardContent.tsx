'use client';
import React from 'react';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';

type CardContentProps = {
    recipe: Recipe;
    highlighted?: boolean;
    smallCard?: boolean;
};

function CardContent({ recipe, highlighted = false, smallCard = false }: CardContentProps) {
    const totalTime = recipe.cookingTime
        ? recipe.preparingTime
            ? recipe.cookingTime + recipe.preparingTime
            : recipe.cookingTime
        : recipe.preparingTime
        ? recipe.preparingTime
        : 0;

    return (
        <>
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
                                className={`${
                                    smallCard
                                        ? 'p-big !text-base !leading-none lg-w-[140px]'
                                        : 'p-big lg:w-[160px] leading-5'
                                }  !mb-0 w-4/5 sm:w-[140px]  recipeName`}
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
        </>
    );
}

export default CardContent;
