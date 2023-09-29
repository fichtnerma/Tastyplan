import Image from 'next/image';
import { getServerSession } from 'next-auth';
import RecipeSteps from '@components/RecipeSteps/RecipeSteps';
import IngredientList from '@components/IngredientList/IngredientList';
import IconList from '@components/IconList/IconList';
import { fetchWithAuth, getFormOfDietIcon } from '@helpers/utils';
import { Recipe } from 'src/types/types';
import styles from '@styles/DetailRecipe.module.scss';
import FavoriteButton from './FavoriteButton';

export default async function DetailRecipe({ params: { id } }: { params: { id: string } }) {
    const session = await getServerSession();
    const data = await fetchWithAuth(`/service/recipes/${id}`, { method: 'GET' }, session);
    const recipe = (await data.json()) as Recipe;

    const icons = [
        { id: 1, src: getFormOfDietIcon(recipe.formOfDiet), withTime: false, text: recipe?.formOfDiet },
        { id: 2, src: 'totaltime', withTime: true, text: recipe?.totalTime + '' },
        { id: 3, src: 'cookingTime', withTime: true, text: recipe?.cookingTime + '' },
        { id: 4, src: 'preparingTime', withTime: true, text: recipe?.preparingTime + '' },
    ];

    return (
        <div className="max-w-[1920px] p-6 md:p-14 md:pt-24 lg:mx-auto">
            <div className="flex mb-4 px-6 lg:px-0 lg:pr-6">
                <h1 className="h2 w-3/4 text-green-custom2 !mb-0">{recipe?.name}</h1>
                <FavoriteButton recipe={recipe} />
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
                            priority
                        />
                        <div className="absolute bottom-0 flex justify-around w-full pb-2">
                            <IconList icons={icons} />
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <IngredientList ingredients={recipe?.ingredients} />
                    </div>
                </div>
                <div className="mb-8 lg:grid lg:grid-cols-3 lg:mb-28">
                    <div className="px-4 lg:col-span-2 lg:px-0">
                        <RecipeSteps recipe={recipe} />
                    </div>
                </div>
                <div>
                    <h3 className="text-center text-green-custom2">Well done!</h3>
                </div>
            </div>
        </div>
    );
}
