import { RecipesSearchService } from './recipesSearch.service';
import { Preferences, RecipesFilterService } from './recipesFilter.service';
import { RecipeQueries } from './recipe.queries';
import { ExtendetRecipe, RecipeInput } from './recipe.interface';
import { convertToTime, shuffleArray } from 'src/helpers/converter.utils';
import { Cache } from 'cache-manager';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RecipesService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private recipeFilterService: RecipesFilterService,
        private recipeSearchService: RecipesSearchService,
        private recipeQueries: RecipeQueries,
    ) {}

    async findById(id: number) {
        try {
            return await this.recipeQueries.findUniqueRecipe(id);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to find recipe by id');
        }
    }

    async storeInRedis() {
        const recipes = await this.recipeQueries.findManyRecipes();

        const recipesFormatted = recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient, name: ingredient.ingredient.name })),
        }));
        await this.cache.set('recipes', recipesFormatted, 0);
    }

    async createRecipe(recipe: RecipeInput) {
        const extendedRecipe: ExtendetRecipe = {
            ...recipe,
            cookingTime: convertToTime(recipe.cookingTime) || 0,
            preparingTime: convertToTime(recipe.prepareTime) || 0,
            totalTime: convertToTime(recipe.totalTime) || 0,
            servings: +recipe.servings || 4,
            formOfDiet: recipe.formOfDiet || 'omnivore',
        };
        await this.recipeQueries.upsertRecipe(extendedRecipe);
    }

    async categorizeRecipe(
        ingredients: {
            categories: string;
            subcategories: string;
        }[],
    ) {
        const omnivoreCategories = ['Meat and sausage products', 'Meat and offal'];
        const pescetaraianCategories = ['Fish'];
        const vegetarianCategories = ['Milk and dairy products', 'Eggs'];

        const omnivoreSubCategories = [
            'Boiled sausage products',
            'Raw sausage products',
            'Meat Stews',
            'Cooked sausages',
            'Veal,meat and offal',
            'Wild',
            'Poultry',
            'Pork,meat and offal',
            'Lamb, Sheep',
            'Poultry,meat and offal',
            'Beef',
            'Pig',
        ];
        const pescetaraianSubCategories = [
            'Sea fish',
            'Freshwater fish',
            'Freshwater fish,Fish',
            'Seafood, crustaceans and shellfish',
            'Fish products',
        ];
        const vegetarianSubCategories = [
            'Gelling and binding agents',
            'Hard cheese',
            'Cream cheese and curd',
            'Soft cheese',
            'Milk and yoghurt drinks',
            'Milk and yoghurt drinks,Soft drinks',
            'Cream,Milk and dairy products',
            'Milk',
            'Fats,milk and dairy products',
            'Yoghurt and sour milk',
            'Fat',
            'Cream cheese and curd,milk and dairy products',
            'Creams and puddings',
            'Mayonnaises',
            'Soft cheese,Milk and dairy products',
            'Cheese products',
        ];

        const formOfDiet = ingredients.reduce(
            (acc, curr) => {
                if (
                    omnivoreCategories.includes(curr.categories) ||
                    omnivoreSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('pescetarian'), 1);
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    pescetaraianCategories.includes(curr.categories) ||
                    pescetaraianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    vegetarianCategories.includes(curr.categories) ||
                    vegetarianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                return acc;
            },
            ['omnivore', 'pescetarian', 'vegetarian', 'vegan'],
        );

        return formOfDiet.at(-1) || 'omnivore';
    }

    async getRecommendations(k: number, preferances: Preferences, id: string) {
        try {
            let recommendedRecipeIds;
            if (id) {
                const recommendedRecipeRes = await fetch(`${process.env.RECOMMENDER_URL}/recommend/${id}?k=${k * 4}`);
                recommendedRecipeIds = (await recommendedRecipeRes.json())[0];
            }

            let { recipes: fetchedMeals } = await this.recipeFilterService.filterByQuery(
                preferances,
                recommendedRecipeIds || undefined,
            );

            if (fetchedMeals.length < k) {
                fetchedMeals = [...fetchedMeals, ...fetchedMeals, ...fetchedMeals, ...fetchedMeals];
            }

            const shuffeledMeals = shuffleArray(fetchedMeals);
            const recipeIds = shuffeledMeals.slice(0, k);
            const recipes = await this.recipeQueries.findManyRecipesWithId(recipeIds.map((object) => object.id));

            return recipes;
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException('Error: no k random recipes could be created');
        }
    }
    async getRecipeTags() {
        const tags = [
            'cauliflower',
            'german',
            'pastries',
            'rice',
            'vegetables',
            'ground beef recipes',
            'coconut',
            'shrimp salad recipes',
            'turkey',
            'persian',
            'soups and stews',
            'wraps and rolls',
            'baked salmon recipes',
            'greek',
            'pork soup recipes',
            'tacos',
            'pasta',
            'seafood salad recipes',
            'pesto chicken recipes',
            'italian',
            'beans and peas',
            'beans and rice recipes',
            'potatoes',
            'fajita recipes',
            'fried rice recipes',
            'chicken',
            'meat sauce',
            'orange salad recipes',
            'sauces and condiments',
            'roasted potato recipes',
            'appetizers and snacks',
            'south african',
            'enchilada recipes',
            'mexican',
            'scallops',
            'vegetarian taco recipes',
            'bread',
            'empanadas',
            'potato salad recipes',
            'portuguese',
            'latin american',
            'seafood',
            'vietnamese',
            'sandwich recipes',
            'one-pot meal recipes',
            'black bean salad recipes',
            'middle eastern',
            'breakfast and brunch',
            'spaghetti',
            'squash',
            'pilaf',
            'lunch',
            'split pea soup recipes',
            'roasted',
            'pork',
            'skewers and kabobs',
            'ramen noodle recipes',
            'vegetarian pasta salad recipes',
            'melons',
            'tortellini recipes',
            'beef',
            'gnocchi recipes',
            'risotto recipes',
            'pasta sauces',
            'sauces',
            'african',
            'beef soup recipes',
            'green peas',
            'everyday cooking',
            'german potato salad recipes',
            'ground turkey recipes',
            'dinner',
            'minestrone',
            'rice bowl',
            'vegetable soup recipes',
            'indian',
            'spanish',
            'veggie',
            'curries',
            'soups, stews and chili recipes',
            'shellfish',
            'vegan',
            'brazilian',
            'vegetarian',
            'omelet recipes',
            'chicken pasta',
            'side dishes',
            'mexican-style chicken',
            'pan fried',
            'parmesan',
            'shrimp',
            'japanese',
            'taco recipes',
            'side dish',
            'casserole recipes',
            'potato',
            'soup recipes',
            'cheese',
            'bbq & grilling',
            'pasta and noodles',
            'thai',
            'watermelons',
            'salad',
            'tabbouleh',
            'stuffed bell pepper recipes',
            'asian',
            'eggplant',
            'bowls',
            'chicken breast',
            'egyptian',
            'fruits',
            'fruits and vegetables',
            'hot dogs and corn dogs recipes',
            'stuffed',
            'beans',
            'tapas',
            'fruit salad recipes',
            'korean',
            'carrot soup recipes',
            'tomato pasta salad recipes',
            'grains',
            'potatoes au gratin recipes',
            'pork chop recipes',
            'north african',
            'creamy chicken',
            'stir-fry',
            'chicken piccata recipes',
            'rice side dish recipes',
            'wraps and roll-ups',
            'main dishes',
            'spinach salad recipes',
            'mashed potato recipes',
            'roasted vegetable recipes',
            'chili recipes',
            'european',
            'seafood main dishes',
            'scrambled',
            'lentil soup recipes',
            'pasta by shape recipes',
            'green salad recipes',
            'sheet pan dinner recipes',
            'vegetable salad recipes',
            'caribbean',
            'eggs',
            'crepes',
            'noodle recipes',
            'burger recipes',
            'pasta salad',
            'south american',
            'cuisine',
            'noodle soup recipes',
            'chinese',
            'meat and poultry',
            'stews',
            'filipino',
            'sweet',
            'salmon',
        ];
        return tags;
    }
}
