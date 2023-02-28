// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();
const fs = require('fs');
const parse = require('csv-parser');

async function main() {
    initIngredients();
    // await initRecipes();
}

function initIngredients() {
    const ingredients: any[] = [];
    try {
        fs.createReadStream('./prisma/seeds/ingredients.csv')
            .pipe(parse({ separator: ';' }))
            .on('data', function (row: any) {
                const ingredient = {
                    name: row['Name'],
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
                console.log(ingredients.slice(0, 10));

                const ingredientPromises = ingredients.slice(0, 10).map((ingredient) => {
                    prisma.ingredient.upsert({
                        where: { name: ingredient.name },
                        update: {},
                        create: {
                            ...ingredient,
                        },
                    });
                });
                const ing = await Promise.all(ingredientPromises);
                console.log(ing);

                console.log('Ingredients added');
            });
    } catch (error) {
        console.error(error);
    }
}

async function initRecipes() {
    const recipes: any[] = require('../seeds/recipes.json');
    const recipePromises = recipes.map((recipe) => {
        prisma.recipe.create({
            data: {
                ...recipe,
            },
        });
    });
    await Promise.all(recipePromises);
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
