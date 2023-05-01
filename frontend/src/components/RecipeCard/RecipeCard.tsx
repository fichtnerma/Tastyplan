import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFormOfDietIcon } from '@helpers/utils';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
    recipe: Recipe;
    highlighted: boolean;
};

function RecipeCard({ recipe, highlighted }: RecipeCardProps) {
    return (
        <Link href={`/recipe/${recipe.id}`}>
            <div className={styles.wrapperContainer}>
                <div className={styles.foodBox}>
                    <Image
                        src={`/service/images/${recipe.img}`}
                        width={200}
                        height={200}
                        alt="Food Img"
                        className={styles.foodImg}
                    />
                </div>
                <div className={highlighted ? `${styles.weekplanBox} ${styles.weekplanBoxToday}` : styles.weekplanBox}>
                    <div
                        className={
                            recipe.name.length >= 20
                                ? `${styles.discriptionFood} ${styles.twoLinesName}`
                                : styles.discriptionFood
                        }
                    >
                        <div className="h-16 absolute bottom-0">
                            <p
                                className="text-2xl w-56 absolute bottom-0"
                                style={{
                                    color: highlighted ? 'var(--white)' : 'var(--black)',
                                }}
                            >
                                {recipe.name}
                            </p>
                        </div>
                        <div className={styles.discriptionHover}>
                            {recipe.preparingTime !== null && (
                                <div className="flex flex-row gap-x-2">
                                    <Image
                                        src={'/Icons/time.svg'}
                                        alt="Time Icon"
                                        className="mb-4 mt-4"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                    <p
                                        className="text-base mb-4 mt-4"
                                        style={{
                                            color: highlighted ? 'var(--white)' : 'var(--black)',
                                        }}
                                    >
                                        {recipe.preparingTime} min
                                    </p>
                                </div>
                            )}
                            {recipe.formOfDiet !== null && (
                                <div className="flex flex-row gap-x-2">
                                    <Image
                                        src={getFormOfDietIcon(recipe.formOfDiet)}
                                        alt="Time Icon"
                                        className="mb-4"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                    <p
                                        className="text-base mb-4"
                                        style={{
                                            color: highlighted ? 'var(--white)' : 'var(--black)',
                                        }}
                                    >
                                        {recipe.formOfDiet}
                                    </p>
                                </div>
                            )}
                            {recipe.cookingTime !== null && (
                                <div className="flex flex-row gap-x-2">
                                    <Image
                                        src={'/Icons/topf.png'}
                                        alt="Time Icon"
                                        className="mb-4"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                    <p
                                        className="text-base mb-4"
                                        style={{
                                            color: highlighted ? 'var(--white)' : 'var(--black)',
                                        }}
                                    >
                                        {recipe.cookingTime} min
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default RecipeCard;
