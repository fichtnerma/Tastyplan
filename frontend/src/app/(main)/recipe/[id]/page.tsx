import Image from 'next/image';
import RecipeSteps from '@components/RecipeSteps/RecipeSteps';
import IngredientList from '@components/IngredientList/IngredientList';
import IconList from '@components/IconList/IconList';
import { calculateMinutesToHours, getFormOfDietIcon, getImageRessourcePath } from '@helpers/utils';
import { Recipe } from 'src/types/types';
import styles from '@styles/DetailRecipe.module.scss';
import FavoriteButton from './FavoriteButton';

export default async function DetailRecipe({ params: { id } }: { params: { id: string } }) {
    const data = await fetch(`${process.env.API_URL ? process.env.API_URL : 'http://api:3000'}/recipes/${id}`, {
        method: 'GET',
    });
    const recipe = (await data.json()) as Recipe;

    const prepareTime = recipe?.preparingTime
        ? recipe?.preparingTime
        : recipe?.totalTime - recipe?.cookingTime > 0
        ? recipe?.totalTime - recipe?.cookingTime
        : 0;

    const icons = [
        { id: 1, src: getFormOfDietIcon(recipe.formOfDiet), text: recipe?.formOfDiet },
        { id: 2, src: 'totaltime', text: calculateMinutesToHours(recipe?.totalTime) },
        { id: 3, src: 'cookingTime', text: calculateMinutesToHours(recipe?.cookingTime) },
        { id: 4, src: 'preparingTime', text: calculateMinutesToHours(prepareTime) },
    ];

    return (
        <div className="mainContainer">
            <div className="flex mb-4 px-6 lg:px-0">
                <h1 className="h2 w-3/4 text-green-custom2 !mb-0">{recipe?.name}</h1>
                <FavoriteButton recipe={recipe} />
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:mb-10 xl:mb-20">
                <div className="flex justify-center mb-10">
                    <div className="relative max-w-[400px] lg:col-span-2 lg:mb-0 lg:h-fit lg:max-w-[700px]">
                        <div className={styles.gradientBox}></div>
                        <Image
                            src={getImageRessourcePath(recipe.img)}
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
                </div>
                <div className="lg:col-span-1 lg:ml-[auto] lg:mr-[0]">
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
    );
}
