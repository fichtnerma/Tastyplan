import { useRouter } from 'next/router';
import Image from 'next/image';
import RecipeSteps from '@components/RecipeSteps/RecipeSteps';
import IngredientList from '@components/IngredientList/IngredientList';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import { useFetchWithAuth } from '@hooks/useFetchWithAuth';
import { Recipe } from 'src/types/types';
import styles from '../../styles/DetailRecipe.module.scss';

export default function DetailRecipe() {
    const router = useRouter();
    const id = router.query.id;
    const [loading, data] = useFetchWithAuth(`/service/recipes/${id}`, { method: 'GET' });
    const recipe = data as Recipe;
    return (
        <>
            {!loading ? (
                <div className={styles.container}>
                    <div className="flex w-full">
                        <h1 className={styles.titleRecipe}>{recipe?.name}</h1>
                        <div className="fill-none w-fit right-[6rem] top-[180px] absolute hover:fill-green-custom1 ">
                            <Icon size={50} icon="heart"></Icon>
                        </div>
                    </div>
                    <div className={styles.recipeBox}>
                        <Image
                            src={`/service/images/${recipe?.img}`}
                            alt={'Pancakes Bild'}
                            width={400}
                            height={400}
                            className={styles.foodImg}
                        />
                        <div className={styles.gradientBox}>
                            <div>
                                <div className="flex flex-col float-right h-[550px] justify-between">
                                    <div className="m-6">
                                        <div className="grid justify-center">
                                            <Icon size={40} icon={getFormOfDietIcon(recipe?.formOfDiet)}></Icon>
                                        </div>
                                        <h5 className="text-center">{recipe?.formOfDiet}</h5>
                                    </div>
                                    <div className="m-6">
                                        <div className="grid justify-center">
                                            <Icon size={40} icon="totaltime"></Icon>
                                        </div>
                                        <h5 className="text-center">{recipe?.totalTime} min</h5>
                                    </div>
                                    <div className="m-6">
                                        <div className="grid justify-center">
                                            <Icon size={40} icon="cookingTime"></Icon>
                                        </div>
                                        <h5 className="text-center">{recipe?.cookingTime} min</h5>
                                    </div>
                                    <div className="m-6">
                                        <div className="grid justify-center">
                                            <Icon size={40} icon="preparingTime"></Icon>
                                        </div>
                                        <h5 className="text-center">{recipe?.preparingTime} min</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-20">
                            <div className="grid grid-cols-3">
                                <div className="col-span-1 border-r-costume1 border-r-8 mr-10">
                                    <div className="border-b-costume1 border-b-8 mb-10">
                                        <IngredientList ingredients={recipe?.ingredients} />
                                    </div>
                                    <h4>Nutrition</h4>
                                </div>
                                <div className="col-span-2">
                                    <RecipeSteps recipe={recipe} />
                                </div>
                            </div>

                            <div className="mt-40 pb-40">
                                <h3 className="text-center text-green-custom2">Well done!</h3>
                                <p className="text-center">How do you rate the recipe?</p>
                                <div className="flex justify-center mt-5">
                                    {Array.from(Array(5), (index) => (
                                        <>
                                            <div className="fill-none hover:fill-green-custom1">
                                                <Icon key={index} size={24} icon="star" />
                                            </div>
                                        </>
                                    ))}
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
