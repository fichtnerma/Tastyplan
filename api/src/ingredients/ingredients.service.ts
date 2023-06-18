import IngredientsSearchService from './ingredientsSearch.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    levenshteinMultiWordSimilarity,
    gestaltSimilarity,
    smithWatermanSimilarity,
    jaroWinklerSimilarity,
} from 'src/helpers/similarity.utils';
import Prep from 'src/helpers/MatchingPrep';
import { convertToTime } from 'src/helpers/converter.utils';
import { log } from 'console';
import { Ingredient } from '@prisma/client';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
const fs = require('fs');
const parse = require('csv-parser');
const crypto = require('crypto');
@Injectable()
export class IngredientsService implements OnApplicationBootstrap {
    constructor(private prismaService: PrismaService, private ingredientSearchService: IngredientsSearchService) {}
    dataUrl = `${process.cwd()}/dist/ingredients/data`;
    async onApplicationBootstrap() {
        await this.createIngredients();
        await this.initRecipes();
    }

    async createIngredients() {
        const hashSum = crypto.createHash('sha256');
        const ingredients = await this.readCSVIngredients();
        hashSum.update(fs.readFileSync(`${this.dataUrl}/ingredients.csv`).toString('utf-8'));
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
                await this.prismaService.ingredient.upsert({
                    where: { id: index },
                    update: {},
                    create: {
                        id: index,
                        name: ingredient.name.toLowerCase(),
                        categories: ingredient.categories,
                        subcategories: ingredient.subcategories,
                        calories: parseFloat(`${ingredient.calories}`) || null,
                        protein: parseFloat(`${ingredient.protein}`) || null,
                        fat: parseFloat(`${ingredient.fat}`) || null,
                        carbs: parseFloat(`${ingredient.carbs}`) || null,
                        calcium: parseFloat(`${ingredient.calcium}`) || null,
                        iron: parseFloat(`${ingredient.iron}`) || null,
                        magnesium: parseFloat(`${ingredient.magnesium}`) || null,
                        allergens: ingredient.allergens || [],
                    },
                });
            }
        }
        await this.createIndex();
    }

    readCSVIngredients(): Promise<Omit<Ingredient, 'id'>[]> {
        return new Promise((resolve, reject) => {
            const ingredients: Omit<Ingredient, 'id'>[] = [];
            try {
                fs.createReadStream(`${this.dataUrl}/ingredients.csv`)
                    .pipe(parse({ separator: ';' }))
                    .on('data', function (row: Omit<Ingredient, 'id'>) {
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

    async initRecipes() {
        const rawdata = fs.readFileSync(`${this.dataUrl}/recipe_dump.json`);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(rawdata.toString('utf-8'));
        const recipeHash = hashSum.digest('hex');
        console.log(recipeHash);

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
            for (let index = 0; index < recipes.length; index++) {
                const recipe = recipes[index];
                log(`Creating recipe ${index} of ${recipes.length}`);
                const ingredientEntities: { quantity: number; unit: string; ingredientId: number }[] = [];
                for (let index = 0; index < recipe.ingredients.length; index++) {
                    const ingredient = recipe.ingredients[index];
                    const ingredientEntity = {
                        quantity: parseFloat(ingredient.quantity) || 1,
                        unit: ingredient.unit,
                        ingredientId: await this.findSimilarIngredients(ingredient.name),
                    };
                    ingredientEntities.push(ingredientEntity);
                }
                const ing = await this.prismaService.ingredient.findMany({
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
                const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~'-]/g;
                await this.prismaService.recipe.upsert({
                    where: { id: index + 1 },
                    update: {},
                    create: {
                        id: index + 1,
                        name: recipe.name,
                        img: recipe.name.replace(specialCharacter, '') + '.png',
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
    }

    async findSimilarIngredients(ingredient: string) {
        const preparedIngredient = Prep.prepForMatching(ingredient);

        let ingredients = await this.prismaService.ingredient.findMany();

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
        return ing[0].id;
    }

    async searchForIngredients(name: string) {
        const results = await this.ingredientSearchService.search(name);
        if (!results.length) {
            return [];
        }
        return results;
    }
    async createIndex() {
        const ingredients = await this.prismaService.ingredient.findMany();
        await this.ingredientSearchService.createIndex(ingredients);
    }
}
