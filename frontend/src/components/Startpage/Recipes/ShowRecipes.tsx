import CardContent from '@components/RecipeCard/CardContent';
import { Recipe } from 'src/types/types';
import styles from '../../RecipeCard/RecipeCard.module.scss';

export async function ShowRecipes() {
    const numberOfRecipes = 5;
    const recipes = [] as Recipe[];
    for (let i = 1; i <= numberOfRecipes; i++) {
        const data = await fetch(`${process.env.API_URL ? process.env.API_URL : 'http://api:3000'}/recipes/${i}`, {
            method: 'GET',
        });
        const recipe = (await data.json()) as Recipe;
        recipes.push(recipe);
    }

    return (
        <>
            <div className="flex ">
                {recipes &&
                    recipes.map((recipe) => (
                        <>
                            <div
                                className={`${styles.wrapperContainer}  md:!h-[300px] md:!w-[200px] bg-white-custom rounded-custom_s relative w-[150px] h-[225px] drop-shadow m-4`}
                            >
                                <div className="block h-full">
                                    <CardContent recipe={recipe} highlighted={false} smallCard={false} />
                                </div>
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
}

export default ShowRecipes;
