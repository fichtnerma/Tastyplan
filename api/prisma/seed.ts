// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { convertToTime } from '../src/helpers/converter.utils';
import { gestaltSimilarity, levenshteinMultiWordSimilarity } from '../src/helpers/similarity.utils';

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
};

async function initIngredients() {
    const ingredients: any = await readCSVIngredients();
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
            },
        });
    }
    console.log('Ingredients added');
}

function readCSVIngredients() {
    return new Promise((resolve, reject) => {
        const ingredients: Ingredient[] = [];
        try {
            fs.createReadStream('./prisma/seeds/ingredients.csv')
                .pipe(parse({ separator: ';' }))
                .on('data', function (row: any) {
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
                    };
                    ingredients.push(ingredient);
                })
                .on('end', async function () {
                    resolve(ingredients);
                });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

async function initRecipes() {
    // const rawdata = fs.readFileSync('./prisma/seeds/recipes.json');
    const rawdata = fs.readFileSync('./prisma/seeds/recipe_dump.json');
    const recipes = JSON.parse(rawdata);

    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredientEntities: any[] = [];
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
                        data: recipe.steps.map((step: any) => ({
                            stepCount: +step.stepCount,
                            description: step.description,
                        })),
                    },
                },
            } as any,
        });
    }
}

async function findSimilarIngredients(ingredient: any) {
    const ingredientSubStrings = ingredient.split(' ');

    let ingredients: any[] = [];
    for (let index = 0; index < ingredientSubStrings.length; index++) {
        if (index > 1) break;
        const matchingIngredients = await prisma.ingredient.findMany({
            where: {
                name: {
                    startsWith: ingredientSubStrings[index].substring(0, 3),
                },
            },
        });
        ingredients.push(...matchingIngredients);
    }

    ingredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));
    const similarIngredients = ingredients.map((ing) => {
        return {
            id: ing.id,
            name: ing.name,
            levenshtein: levenshteinMultiWordSimilarity(ing.name, ingredient),
            gestalt: gestaltSimilarity(ing.name, ingredient),
            similarity: levenshteinMultiWordSimilarity(ing.name, ingredient) + gestaltSimilarity(ing.name, ingredient),
        };
    });
    const ing = similarIngredients.sort((a, b) => b.similarity - a.similarity)[0];
    if (ing?.similarity < 1.2 || ing == undefined) {
        console.log(
            'Ingredient: ' +
                ingredient +
                ' -> ' +
                ing?.name +
                ' with similarity of: (' +
                ing?.similarity +
                ')' +
                ' (' +
                ing?.levenshtein +
                ' + ' +
                ing?.gestalt +
                ')',
        );
    }

    return ing?.id;
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
