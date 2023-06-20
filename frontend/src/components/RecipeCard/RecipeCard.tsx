import React, { useState } from 'react';
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
    const [favorit, setFavorit] = useState(false);
    const className = getNumberOfLines(recipe);

    const isFavorit = () => {
        if (favorit) {
            return setFavorit(false);
        }
        return setFavorit(true);
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
                        fill: favorit ? (highlighted ? 'var(--white)' : 'var(--green-dark)') : 'none',
                    }}
                    onClick={() => isFavorit()}
                >
                    <Icon size={30} icon="heart"></Icon>
                </div>
                <Link href={`/recipe/${recipe.id}`}>
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
                        <div className={className}>
                            <div className="">
                                <div className="h-16  w-full absolute bottom-0 col-span-4">
                                    <p
                                        className="text-l lg:text-2xl w-4/5 sm:w-[140px] lg:w-[210px] absolute bottom-0 recipeName"
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

function getNumberOfLines(recipe: Recipe) {
    const pTags = document.querySelectorAll('.recipeName');
    const numLinesArray: { name: string | undefined; numLines: number }[] = [];

    console.log('hallo du witz');

    if (pTags) {
        pTags.forEach((pTag) => {
            const lineHeight = parseInt(window.getComputedStyle(pTag).getPropertyValue('line-height'));
            const numLines = Math.round(pTag.clientHeight / lineHeight);
            const recipeName = pTag.textContent?.trim();
            numLinesArray.push({ name: recipeName, numLines: numLines });
        });
    }

    let className = styles.discriptionFood;
    const matchingEntry = numLinesArray.filter((entry) => entry.name === recipe.name);
    matchingEntry.forEach((entry) => {
        if (entry.numLines == 0) {
            return className;
        }
        const numLines = entry.numLines;

        if (numLines) {
            className =
                numLines >= 4
                    ? `${styles.discriptionFood} ${styles.fourLinesName}`
                    : numLines == 3
                    ? `${styles.discriptionFood} ${styles.threeLinesName}`
                    : numLines == 2
                    ? `${styles.discriptionFood} ${styles.twoLinesName}`
                    : styles.discriptionFood;
        }
    });
    return className;
}

export default RecipeCard;
