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
        private recipeQueires: RecipeQueries,
    ) {}

    async findById(id: number) {
        try {
            return await this.recipeQueires.findUniqueRecipe(id);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to find recipe by id');
        }
    }

    async storeInRedis() {
        const recipes = await this.recipeQueires.findManyRecipes();

        const recipesFormatted = recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient, name: ingredient.ingredient.name })),
        }));
        await this.cache.set('recipes', recipesFormatted, 0);
    }

    async createRecipe(recipe: RecipeInput) {
        console.log('Recipe Id', recipe.id);

        const extendetRecipe: ExtendetRecipe = {
            ...recipe,
            cookingTime: convertToTime(recipe.cookingTime) || 0,
            preparingTime: convertToTime(recipe.prepareTime) || 0,
            totalTime: convertToTime(recipe.totalTime) || 0,
            servings: +recipe.servings || 4,
            formOfDiet: recipe.formOfDiet || 'omnivore',
        };
        await this.recipeQueires.upsertRecipe(extendetRecipe);
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

    async getRecommendations(k: number, preferances: Preferences) {
        try {
            let { recipes: fetchedMeals } = await this.recipeFilterService.filterByQuery(preferances);

            if (fetchedMeals.length < k) {
                fetchedMeals = [
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                ];
            }

            const shuffeledMeals = shuffleArray(fetchedMeals);
            const recipeIds = shuffeledMeals.slice(0, k);
            const recipes = await this.recipeQueires.findManyRecipesWithId(recipeIds.map((object) => object.id));

            return recipes;
        } catch (error) {
            throw new InternalServerErrorException('Error: no k random recipes could be created');
        }
    }
}
