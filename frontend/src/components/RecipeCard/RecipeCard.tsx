'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import ChangeRecipeModal from '@components/ChangeRecipeModal/ChangeRecipeModal';
import { useSwitchRecipeContext } from '@hooks/useSwitchRecipeContext';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';
import CardContent from './CardContent';

type RecipeCardProps = {
    recipe?: Recipe;
    highlighted?: boolean;
    withSwitch?: boolean;
    smallCard?: boolean;
    entryId?: string;
    refreshWeekplan?: () => void;
    isLunch?: boolean;
};

function RecipeCard({
    recipe,
    highlighted = false,
    withSwitch = false,
    smallCard = false,
    entryId,
    isLunch = false,
}: RecipeCardProps) {
    const [recipeInfo, setRecipe] = useState<Recipe | undefined>(recipe);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const { data: session } = useSession();
    const { favorites, add, remove } = useFavoriteStore();
    const __swRecipeContext = useSwitchRecipeContext();

    const smallCardSize = 'md:!h-[225px] md:!w-[150px] bg-green-custom_super_light';
    const mediumCardSize = 'md:!h-[300px] md:!w-[200px] bg-white-custom';

    useEffect(() => {
        const fav = favorites.find((favorit) => favorit.id === recipeInfo?.id);
        if (fav) setIsFavorite(true);
    }, [isFavorite, favorites, recipeInfo]);

    const handleFavorite = async () => {
        if (recipeInfo) {
            if (isFavorite) {
                remove(recipeInfo.id, session);
            } else {
                add(recipeInfo, session);
            }
        }
        setIsFavorite((isFavorite) => !isFavorite);
    };

    const openModal = () => {
        setIsOpened(!isOpened);
    };

    const refreshWeekplan = (recipe: Recipe | undefined) => {
        setRecipe(recipe);
    };

    return (
        <>
            {recipeInfo ? (
                <div
                    className={`${styles.wrapperContainer} ${
                        smallCard ? smallCardSize : mediumCardSize
                    } rounded-custom_s relative w-full h-[225px] sm:h-[160px]`}
                >
                    {__swRecipeContext ? (
                        <div
                            className={`justify-end flex p-1 top-[10px] text-green-custom3 right-2 rounded-full cursor-pointer absolute fill-none z-10 bg-white-custom 
                    transition-all duration-600 ease-in-out hover:bg-green-custom3 hover:text-white-custom ${styles.icon__inverted}`}
                            onClick={() => handleFavorite()}
                        >
                            <Icon size={18} icon="check"></Icon>
                        </div>
                    ) : (
                        <div
                            className={`justify-end ${
                                highlighted ? styles.icon__highlighted : styles.icon__notHighlighted
                            } ${
                                isFavorite ? styles.icon__favorite : 'none'
                            } flex p-1 top-[10px] text-white-custom right-2 rounded-full cursor-pointer absolute fill-none z-10 bg-green-custom2 
                transition-all duration-600 ease-in-out hover:bg-green-custom3 ${styles.icon}`}
                            onClick={() => handleFavorite()}
                        >
                            <Icon size={18} icon="heart"></Icon>
                        </div>
                    )}

                    <div
                        className={`justify-end ${highlighted ? styles.icon__highlighted : styles.icon__notHighlighted}
                    ${withSwitch ? 'block' : 'hidden'}
            
                    flex p-1 top-[10px] text-white-custom right-10 rounded-full cursor-pointer absolute z-10 bg-green-custom2  transition-all duration-600 ease-in-out ${
                        styles.icon
                    }`}
                        onClick={openModal}
                    >
                        <Icon size={18} icon="switch"></Icon>
                    </div>
                    {__swRecipeContext ? (
                        <button
                            className="block h-full w-full text-left"
                            onClick={() => __swRecipeContext.showDetailView(recipeInfo.id)}
                        >
                            <CardContent recipe={recipeInfo} highlighted={highlighted} smallCard={smallCard} />
                        </button>
                    ) : (
                        <Link className="block h-full" href={`/recipe/${recipeInfo.id}`}>
                            <CardContent recipe={recipeInfo} highlighted={highlighted} smallCard={smallCard} />
                        </Link>
                    )}
                </div>
            ) : (
                <button
                    className="flex justify-center flex-col rounded-custom_s relative w-full h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[200px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2 hover:text-green-custom3"
                    onClick={openModal}
                >
                    <div className="">
                        <Icon size={50} icon="addCircle"></Icon>
                    </div>
                    <h5 className="text-inherit pt-5 m-0">add recipe</h5>
                </button>
            )}

            <ChangeRecipeModal
                open={isOpened}
                recipeId={recipeInfo?.id}
                setIsOpened={setIsOpened}
                entryId={entryId}
                refresh={refreshWeekplan}
                isLunch={isLunch}
            ></ChangeRecipeModal>
        </>
    );
}

export default RecipeCard;
