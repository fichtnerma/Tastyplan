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
                <div className="pt-6">
                    <div className="flex px-6 mb-4">
                        <h1 className="w-3/4 text-green-custom2 !mb-0">{recipe?.name}</h1>
                        <div
                            className="w-1/4 flex justify-end items-center hover:fill-green-custom1 hover:cursor-pointer text-green-custom2 "
                            style={{
                                fill: favorit ? 'var(--green-dark)' : 'none',
                            }}
                            onClick={() => isFavorit()}
                        >
                            <Icon size={50} icon="heart"></Icon>
                        </div>
                    </div>
                    <div>
                        <div className="relative mb-4 lg:w-[700px]">
                            <div className={styles.gradientBox}></div>
                            <Image
                                src={`/service/images/${recipe?.img}`}
                                alt={'Pancakes Bild'}
                                width={400}
                                height={400}
                                className="w-full"
                            />
                            <div className="absolute bottom-0 flex justify-around w-full pb-2">
                                <IconList icons={icons} />
                            </div>
                        </div>
                        <div>
                            <IngredientList ingredients={recipe?.ingredients} />
                            <div className="px-4 mb-8">
                                <RecipeSteps recipe={recipe} />
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
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
}
