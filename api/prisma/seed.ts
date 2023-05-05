/* eslint-disable import-helpers/order-imports */
import {
    gestaltSimilarity,
    jaroWinklerSimilarity,
    levenshteinMultiWordSimilarity,
    smithWatermanSimilarity,
} from '../src/helpers/similarity.utils';
import Prep from '../src/helpers/MatchingPrep';
import { convertToTime } from '../src/helpers/converter.utils';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();
const fs = require('fs');
const parse = require('csv-parser');

let matches = 0;
let noMatches = 0;
const badMatches: any = new Set();
const THREASHOLD = 0.6;

async function main() {
    await initIngredients();
    await initRecipes();
    console.log('Matches: ', matches / (matches + noMatches));
    // fs.writeFile('./prisma/seeds/badMatches.json', JSON.stringify(Array.from(badMatches)));
}
type Ingredient = {
    name: string;
    categories: string;
    subcategories: string;
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    calcium: string;
    iron: string;
    magnesium: string;
    allergens: string[];
};

async function initIngredients() {
    const ingredients: Ingredient[] = await readCSVIngredients();
    for (let index = 1; index < ingredients.length + 1; index++) {
        const ingredient = ingredients[index - 1];
        await prisma.ingredient.upsert({
            where: { id: index },
            update: {},
            create: {
                id: index,
                name: ingredient.name.toLowerCase(),
                categories: ingredient.categories,
                subcategories: ingredient.subcategories,
                calories: parseFloat(ingredient.calories) || null,
                protein: parseFloat(ingredient.protein) || null,
                fat: parseFloat(ingredient.fat) || null,
                carbs: parseFloat(ingredient.carbs) || null,
                calcium: parseFloat(ingredient.calcium) || null,
                iron: parseFloat(ingredient.iron) || null,
                magnesium: parseFloat(ingredient.magnesium) || null,
                allergens: ingredient.allergens || [],
            },
        });
    }
}

function readCSVIngredients(): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
        const ingredients: Ingredient[] = [];
        try {
            fs.createReadStream('./prisma/seeds/ingredients.csv')
                .pipe(parse({ separator: ';' }))
                .on('data', function (row: Ingredient) {
                    const ingredient = {
                        name: row['name'],
                        categories: row['categories'],
                        subcategories: row['subcategories'],
                        calories: row['calories'],
                        protein: row['protein'],
                        fat: row['fat'],
                        carbs: row['carbs'],
                        calcium: row['calcium'],
                        iron: row['iron'],
                        magnesium: row['magnesium'],
                        allergens: row['allergens'],
                    };
                    ingredients.push(ingredient);
                })
                .on('end', async function () {
                    resolve(ingredients);
                });
        } catch (error) {
            reject(error);
        }
    });
}

async function initRecipes() {
    const rawdata = fs.readFileSync('./prisma/seeds/recipe_dump.json');
    const recipes = JSON.parse(rawdata);

    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredientEntities: { quantity: number; unit: string; ingredientId: number }[] = [];
        for (let index = 0; index < recipe.ingredients.length; index++) {
            const ingredient = recipe.ingredients[index];
            const ingredientEntity = {
                quantity: parseFloat(ingredient.quantity) || 1,
                unit: ingredient.unit,
                ingredientId: await findSimilarIngredients(ingredient.name),
            };
            ingredientEntities.push(ingredientEntity);
        }
        const ing = await prisma.ingredient.findMany({
            where: {
                id: {
                    in: ingredientEntities.map((ing) => ing.ingredientId),
                },
            },
            select: {
                categories: true,
                subcategories: true,
            },
        });
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
        const formOfDiet = ing.reduce(
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
        await prisma.recipe.upsert({
            where: { id: index + 1 },
            update: {},
            create: {
                id: index + 1,
                name: recipe.name,
                img: recipe.img || null,
                servings: +recipe.servings || 4,
                description: recipe.description,
                cookingTime: convertToTime(recipe.cookingTime) || 0,
                preparingTime: convertToTime(recipe.prepareTime) || 0,
                totalTime: convertToTime(recipe.totalTime) || 0,
                formOfDiet: formOfDiet.at(-1) || 'omnivore',
                ingredients: {
                    createMany: {
                        data: [...ingredientEntities],
                    },
                },
                tags: recipe.tags,
                steps: {
                    createMany: {
                        data: recipe.steps.map((step: { stepCount: number; description: string }) => ({
                            stepCount: +step.stepCount,
                            description: step.description,
                        })),
                    },
                },
            },
        });
    }
}

async function findSimilarIngredients(ingredient: string) {
    const preparedIngredient = Prep.prepForMatching(ingredient);

    let ingredients = await prisma.ingredient.findMany();

    ingredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));
    const similarIngredients = ingredients.map((ing) => {
        return {
            id: ing.id,
            name: ing.name,
            levenshtein: levenshteinMultiWordSimilarity(ing.name, preparedIngredient),
            gestalt: gestaltSimilarity(ing.name, preparedIngredient),
            smithWaterman: smithWatermanSimilarity(ing.name, preparedIngredient),
            jaroWinkler: jaroWinklerSimilarity(ing.name, preparedIngredient),
            similarity:
                (levenshteinMultiWordSimilarity(ing.name, preparedIngredient) +
                    gestaltSimilarity(ing.name, preparedIngredient) +
                    jaroWinklerSimilarity(ing.name, preparedIngredient)) /
                3,
        };
    });
    const ing = similarIngredients.sort((a, b) => b.similarity - a.similarity);

    if (ing[0]?.similarity < THREASHOLD) {
        noMatches++;
        badMatches.add({ ingredient: preparedIngredient, match: ing[0].name });
    } else {
        matches++;
        // console.log('Good match found for: ', preparedIngredient);
        // console.log('Similarities: ', ing[0]);
    }

    return ing[0].id;
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
