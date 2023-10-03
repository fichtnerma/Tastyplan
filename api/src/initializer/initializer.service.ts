import { RecipesService } from 'src/recipes/recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { log } from 'console';
import { Ingredient, Recipe, Step } from '@prisma/client';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
const fs = require('fs');
const parse = require('csv-parser');
const crypto = require('crypto');

type RecipeMapped = Recipe & {
    cookingTime: string;
    totalTime: string;
    prepareTime: string;
    steps: Step[];
    ingredients: {
        ingredientId: number;
    }[];
};
@Injectable()
export class InitializerService implements OnApplicationBootstrap {
    constructor(
        private prismaService: PrismaService,
        private recipeService: RecipesService,
        private ingredientService: IngredientsService,
    ) {}
    dataUrl = `${process.cwd()}/dist/initializer/data`;
    async onApplicationBootstrap() {
        await this.syncIngredients();
        await this.ingredientService.storeinRedis();
        const recipes = await this.readJSONRecipes();
        for await (const recipe of this.syncRecipes(recipes)) {
            await this.recipeService.createRecipe(recipe);
        }
    }

    async syncIngredients() {
        const hashSum = crypto.createHash('sha256');
        const ingredients = await this.readCSVIngredients();
        hashSum.update(fs.readFileSync(`${this.dataUrl}/ingredients.csv`, 'utf8'));
        const ingredientHash = hashSum.digest('hex');

        if (
            (await this.prismaService.ingredient.count()) == 0 ||
            (await this.prismaService.dataSchema.findUnique({ where: { id: 1 } }))?.ingredientHash !== ingredientHash
        ) {
            log('Creating ingredients...');
            await this.prismaService.ingredient.deleteMany({});
            await this.prismaService.dataSchema.upsert({
                where: { id: 1 },
                update: {
                    ingredientHash: ingredientHash,
                },
                create: {
                    id: 1,
                    ingredientHash: ingredientHash,
                },
            });
            for (let index = 1; index < ingredients.length + 1; index++) {
                const ingredient = ingredients[index - 1];
                log(`Creating ingredient ${index} of ${ingredients.length}`);
                await this.ingredientService.createIngredient({ ...ingredient, id: index });
            }
        }
        await this.ingredientService.createIndex();
    }

    readCSVIngredients(): Promise<Omit<Ingredient, 'id'>[]> {
        return new Promise((resolve, reject) => {
            const ingredients: Omit<Ingredient, 'id'>[] = [];
            try {
                fs.createReadStream(`${this.dataUrl}/ingredients.csv`)
                    .pipe(parse({ separator: ';' }))
                    .on('data', function (row: Omit<Ingredient, 'id'>) {
                        ingredients.push({ ...row });
                    })
                    .on('end', async function () {
                        resolve(ingredients);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    async readJSONRecipes(): Promise<RecipeMapped[]> {
        const rawdata = fs.readFileSync(`${this.dataUrl}/recipe_dump.json`);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(rawdata.toString('utf-8'));
        const recipeHash = hashSum.digest('hex');

        const recipes = JSON.parse(rawdata);
        if (
            (await this.prismaService.recipe.count()) == 0 ||
            (await this.prismaService.dataSchema.findUnique({ where: { id: 1 } }))?.recipeHash !== recipeHash
        ) {
            log('Creating recipes...');
            await this.prismaService.recipe.deleteMany({});
            await this.prismaService.dataSchema.upsert({
                where: { id: 1 },
                update: {
                    recipeHash: recipeHash,
                },
                create: {
                    id: 1,
                    recipeHash: recipeHash,
                },
            });
        }
        return recipes;
    }

    async *syncRecipes(recipes: RecipeMapped[]) {
        for (let index = 0; index < recipes.length; index++) {
            const recipe = recipes[index];
            log(`Creating recipe ${index} of ${recipes.length}`);
            yield await this.prepareRecipeData(recipe, index);
        }
    }

    async prepareRecipeData(recipe: RecipeMapped, index: number) {
        const recipeJson = await fetch('http://recommender:5000/mapping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe),
        });
        const recipeMapped = await recipeJson.json();
        const ingredientsMapped = recipeMapped;
        const ing = await this.prismaService.ingredient.findMany({
            where: {
                id: {
                    in: ingredientsMapped.map((ing: { ingredientId: number }) => ing.ingredientId),
                },
            },
            select: {
                categories: true,
                subcategories: true,
            },
        });
        const formOfDiet = await this.recipeService.categorizeRecipe(ing);
        return {
            ...recipe,
            id: index + 1,
            formOfDiet,
            ingredients: [...ingredientsMapped],
        };
    }
}
