import IngredientsSearchService from './ingredientsSearch.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    levenshteinMultiWordSimilarity,
    gestaltSimilarity,
    smithWatermanSimilarity,
    jaroWinklerSimilarity,
} from 'src/helpers/similarity.utils';
import Prep from 'src/helpers/MatchingPrep';
import { Ingredient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
const fs = require('fs');
const parse = require('csv-parser');
const crypto = require('crypto');
@Injectable()
export class IngredientsService {
    constructor(private prismaService: PrismaService, private ingredientSearchService: IngredientsSearchService) {}

    async createIngredient(ingredient: Ingredient) {
        await this.prismaService.ingredient.upsert({
            where: { id: ingredient.id },
            update: {},
            create: {
                id: ingredient.id,
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
        return ing[0];
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
