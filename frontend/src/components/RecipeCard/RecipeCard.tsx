import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
    recipe: Recipe;
    highlighted: boolean;
};

function RecipeCard({ recipe, highlighted }: RecipeCardProps) {
    const pTags = document.querySelectorAll('.recipeName');
    const numLinesArray: { name: string | undefined; numLines: number }[] = [];

    if (pTags) {
        pTags.forEach((pTag) => {
            const lineHeight = parseInt(window.getComputedStyle(pTag).getPropertyValue('line-height'));
            const numLines = Math.round(pTag.clientHeight / lineHeight);
            const recipeName = pTag.textContent?.trim();
            numLinesArray.push({ name: recipeName, numLines: numLines });
        });
    }
    const matchingEntry = numLinesArray.find((entry) => entry.name === recipe.name);
    const numLines = matchingEntry ? matchingEntry.numLines : null;
    let className = styles.discriptionFood;

    if (numLines) {
        className =
            numLines >= 3
                ? `${styles.discriptionFood} ${styles.threeLinesName}`
                : numLines == 2
                ? `${styles.discriptionFood} ${styles.twoLinesName}`
                : styles.discriptionFood;
    }
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
                    <div className={className}>
                        <div className="h-16 absolute bottom-0">
                            <p
                                className="text-2xl w-56 absolute bottom-0 recipeName"
                                style={{
                                    color: highlighted ? 'var(--white)' : 'var(--black)',
                                }}
                            >
                                {recipe.name}
                            </p>
                        </div>
                        <div
                            className={styles.discriptionHover}
                            style={{
                                color: highlighted ? 'var(--white)' : 'var(--black)',
                            }}
                        >
                            {recipe.preparingTime !== (null || 0) && (
                                <div className="flex flex-row gap-x-4 mt-4">
                                    <Icon size={40} icon="totaltime"></Icon>
                                    <p
                                        className="text-lg mt-1 text-center"
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
                                    <Icon size={40} icon="cookingTime"></Icon>
                                    <p
                                        className="text-lg text-center mt-2"
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
                                    <Icon size={40} icon={getFormOfDietIcon(recipe?.formOfDiet)}></Icon>
                                    <p
                                        className="text-lg text-center mt-1"
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
            </div>
        </Link>
    );
}

export default RecipeCard;
