// prisma/seed.ts

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
                name: ingredient.name,
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
                        name: row['Name'],
                        categories: row['Kategorie'],
                        subcategories: row['Subkategorie'],
                        calories: row['Energie, Kalorien (kcal)'],
                        protein: row['Protein (g)'],
                        fat: row['Fett, total (g)'],
                        carbs: row['Kohlenhydrate, verfügbar (g)'],
                        calcium: row['Calcium (Ca) (mg)'],
                        iron: row['Eisen (Fe) (mg)'],
                        magnesium: row['Magnesium (Mg) (mg)'],
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
    const rawdata = fs.readFileSync('./prisma/seeds/recipes.json');
    const recipes = JSON.parse(rawdata);

    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        const ingredientEntities: any[] = [];
        for (let index = 0; index < recipe.ingredients.length; index++) {
            const ingredient = recipe.ingredients[index];
            const ingredientEntity = {
                amount: ingredient.amount,
                ingredientId: await findSimilarIngredients(ingredient.name),
            };
            ingredientEntities.push(ingredientEntity);
        }
        console.log(ingredientEntities);

        await prisma.recipe.upsert({
            where: { id: index + 1 },
            update: {},
            create: {
                id: index + 1,
                name: recipe.name,
                img: recipe.img,
                difficulty: recipe.difficulty,
                kitchenware: recipe.kitchenware,
                cookingTime: parseInt(recipe.cookingTime, 10) || null,
                preparingTime: parseInt(recipe.prepareTime, 10) || null,
                type: recipe.type,
                ingredients: {
                    createMany: {
                        data: [...ingredientEntities],
                    },
                },
                steps: {
                    createMany: {
                        data: recipe.steps.map((step: any) => ({ stepCount: +step.stepCount, description: step.description })),
                    },
                },
            },
        });
    }
}

async function findSimilarIngredients(ingredient: any) {
    const ing = await prisma.ingredient.findFirst({
        where: {
            name: {
                contains: ingredient,
            },
        },
    });
    if (!ing) {
        return (
            await prisma.ingredient.findFirst({
                where: {
                    name: {
                        contains: 'Unbekannt',
                    },
                },
            })
        ).id;
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
