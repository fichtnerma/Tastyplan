import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import RecipeSteps from '@components/RecipeSteps/RecipeSteps';
import IngredientList from '@components/IngredientList/IngredientList';
import IconList from '@components/IconList/IconList';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { IconMetaData, Recipe } from 'src/types/types';
import styles from '../../styles/DetailRecipe.module.scss';

export default function DetailRecipe() {
    const router = useRouter();

    const id = router.query.id;
    const { data, error } = useFetchWithAuth(`/service/recipes/${id}`, { method: 'GET' });
    const recipe = data as Recipe;

    const [rating, setRating] = useState(0);
    const [favorit, setFavorit] = useState(false);
    const [icons, setIcons] = useState<IconMetaData[]>([]);

    useEffect(() => {
        if (recipe) {
            setIcons([
                { id: 1, src: getFormOfDietIcon(recipe.formOfDiet), withTime: false, text: recipe?.formOfDiet },
                { id: 2, src: 'totaltime', withTime: true, text: recipe?.totalTime + '' },
                { id: 3, src: 'cookingTime', withTime: true, text: recipe?.cookingTime + '' },
                { id: 4, src: 'preparingTime', withTime: true, text: recipe?.preparingTime + '' },
            ]);
            console.log(recipe);
        }
    }, [recipe]);

    const rate = (index: number) => {
        setRating(index);
    };

    const isFavorit = () => {
        if (favorit) {
            return setFavorit(false);
        }
        return setFavorit(true);
    };

    return (
        <>
            {!error && data ? (
                <div className="pt-[4rem] sm:pt-[6rem] md:pt-[9rem] lg:pt-[6rem] lg:pl-6 xl:pl-12">
                    <div className="flex mb-4 px-6 lg:px-0 lg:pr-6">
                        <h1 className="h2 w-3/4 text-green-custom2 !mb-0">{recipe?.name}</h1>
                        <div
                            className="w-1/4 flex justify-end items-center hover:fill-green-custom1 hover:cursor-pointer text-green-custom2 "
                            style={{
                                fill: favorit ? 'var(--green-dark)' : 'none',
                            }}
                            onClick={() => isFavorit()}
                        >
                            <Icon size={50} icon="heart" classNames="w-10 lg:w-12"></Icon>
                        </div>
                    </div>
                    <div>
                        <div className="lg:grid lg:grid-cols-3 lg:gap-[5rem] lg:mb-10 xl:mb-20">
                            <div className="relative mb-10 lg:col-span-2 lg:mb-0 lg:h-fit lg:max-w-[1000px]">
                                <div className={styles.gradientBox}></div>
                                <Image
                                    src={`/service/images/${recipe?.img}`}
                                    alt={'Pancakes Bild'}
                                    width={400}
                                    height={400}
                                    className="w-full lg:rounded-[30px]"
                                />
                                <div className="absolute bottom-0 flex justify-around w-full pb-2">
                                    <IconList icons={icons} />
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <IngredientList ingredients={recipe?.ingredients} />
                            </div>
                        </div>
                        <div className="mb-8 lg:grid lg:grid-cols-3 lg:mb-14">
                            <div className="px-4 lg:col-span-2 lg:px-0">
                                <RecipeSteps recipe={recipe} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-center text-green-custom2">Well done!</h3>
                            <p className="text-center">How do you rate the recipe?</p>
                            <div className="flex justify-center mt-5">
                                {Array.from(Array(5)).map((e, i) => {
                                    if (i < rating)
                                        return (
                                            <button
                                                className="fill-green-custom2 text-green-custom2"
                                                onClick={() => rate(i + 1)}
                                            >
                                                <Icon key={i} size={50} icon="star" />
                                            </button>
                                        );
                                    else
                                        return (
                                            <button
                                                className="fill-none hover:fill-green-custom1 text-green-custom2"
                                                onClick={() => rate(i + 1)}
                                            >
                                                <Icon key={i} size={50} icon="star" />
                                            </button>
                                        );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
}
