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

async function main() {
    await initIngredients();
    await initRecipes();
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
                formOfDiet: recipe.formOfDiet || 'omnivore',
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

    // if (ing[0]?.similarity < 0.6 || ing[0] == undefined) {
    //     console.log('Bad match found for: ', preparedIngredient);
    //     for (let index = 0; index < 3; index++) {
    //         console.log('Similarities: ', ing[index]);
    //     }
    // }

    return ing[0]?.id;
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
