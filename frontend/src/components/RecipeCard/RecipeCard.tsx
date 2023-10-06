'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import ChangeRecipeModal from '@components/ChangeRecipeModal/ChangeRecipeModal';
import { useFavoriteStore } from '@hooks/useFavorites';
import { Recipe } from 'src/types/types';
import styles from './RecipeCard.module.scss';
import CardContent from './CardContent';

type RecipeCardProps = {
    recipe?: Recipe;
    highlighted?: boolean;
    withSwitch?: boolean;
    smallCard?: boolean;
    switchRecipe?: () => void;
    entryId?: string;
    refreshWeekplan?: () => void;
    isLunch?: boolean;
};

function RecipeCard({
    recipe,
    highlighted = false,
    withSwitch = false,
    smallCard = false,
    switchRecipe,
    entryId,
    refreshWeekplan,
    isLunch = false,
}: RecipeCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const { data: session } = useSession();
    const { favorites, add, remove } = useFavoriteStore();

    const smallCardSize = 'md:!h-[225px] md:!w-[150px] bg-green-custom_super_light';
    const mediumCardSize = 'md:!h-[300px] md:!w-[200px] bg-white-custom';

    useEffect(() => {
        const fav = favorites.find((favorit) => favorit.id === recipe?.id);
        if (fav) setIsFavorite(true);
    }, [isFavorite, favorites, recipe]);

    const handleFavorite = async () => {
        if (recipe) {
            if (isFavorite) {
                remove(recipe.id, session);
            } else {
                add(recipe, session);
            }
        }
        setIsFavorite((isFavorite) => !isFavorite);
    };

    const openModal = () => {
        setIsOpened(!isOpened);
    };

    return (
        <>
            {recipe ? (
                <div
                    className={`${styles.wrapperContainer} ${
                        smallCard ? smallCardSize : mediumCardSize
                    } rounded-custom_s relative w-full h-[225px] sm:h-[160px]`}
                >
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
                    {switchRecipe ? (
                        <button className="block h-full w-full text-left" onClick={switchRecipe}>
                            <CardContent recipe={recipe} highlighted={highlighted} smallCard={smallCard} />
                        </button>
                    ) : (
                        <Link className="block h-full" href={`/recipe/${recipe.id}`}>
                            <CardContent recipe={recipe} highlighted={highlighted} smallCard={smallCard} />
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
                setIsOpened={setIsOpened}
                entryId={entryId}
                refresh={refreshWeekplan}
                isLunch={isLunch}
            ></ChangeRecipeModal>
        </>
    );
}

export default RecipeCard;
