import CardContent from '@components/RecipeCard/CardContent';
import { Recipe } from 'src/types/types';
import styles from '../../RecipeCard/RecipeCard.module.scss';

export async function ShowRecipes() {
    const recipes = [
        {
            id: 160,
            name: 'Greek-Style Lemon Roasted Potatoes',
            description:
                "These Greek potatoes wedges with lemon and oregano are roasted until tender. They're a great complement to souvlaki. All you need is a great Greek salad for a full meal!",
            img: 'GreekStyleLemonRoastedPotatoes.jpg',
            formOfDiet: 'omnivore',
            preparingTime: 0,
            cookingTime: 60,
            totalTime: 75,
        },
        {
            id: 165,
            name: 'Chicken Yakisoba',
            description:
                'This traditional Japanese yakisoba noodle dish includes cabbage and chicken in a spicy sauce.',
            img: 'ChickenYakisoba.jpg',
            formOfDiet: 'omnivore',
            preparingTime: 0,
            cookingTime: 15,
            totalTime: 35,
        },
        {
            id: 133,
            name: 'Lime Chicken Soft Tacos',
            description: 'These chicken tacos seasoned with lime, oregano, and garlic are flavorful and delicious.',
            img: 'LimeChickenSoftTacos.jpg',
            formOfDiet: 'omnivore',
            preparingTime: 0,
            cookingTime: 30,
            totalTime: 50,
        },
        {
            id: 223,
            name: 'Creamy Cajun Chicken Pasta',
            description:
                'Try this when you are feeling daring and want to mix things up a bit! A Southern inspired recipe that is sure to add a little fun to your dinner table. Try serving it with corn bread.',
            img: 'CreamyCajunChickenPasta.jpg',
            formOfDiet: 'omnivore',
            preparingTime: 0,
            cookingTime: 15,
            totalTime: 30,
        },
        {
            id: 16,
            name: 'Vegetarian Sheet Pan Dinner with Chickpeas and Veggies',
            description: 'Adding chickpeas to root vegetables on a sheet pan makes for an easy dinner!',
            img: 'VegetarianSheetPanDinnerwithChickpeasandVeggies.jpg',
            formOfDiet: 'vegan',
            preparingTime: 0,
            cookingTime: 45,
            totalTime: 10,
        },
    ] as Recipe[];

    return (
        <>
            <div className="flex" data-cy="homepage-recipe-wrapper">
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
