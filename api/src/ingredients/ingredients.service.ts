import IngredientsSearchService from './ingredientsSearch.service';
import IngredientsQueries from './ingredients.queries';
import {
    levenshteinMultiWordSimilarity,
    gestaltSimilarity,
    smithWatermanSimilarity,
    jaroWinklerSimilarity,
} from 'src/helpers/similarity.utils';
import Prep from 'src/helpers/MatchingPrep';
import { throwError } from 'rxjs';
import { Cache } from 'cache-manager';
import { Ingredient } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class IngredientsService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private ingredientSearchService: IngredientsSearchService,
        private ingredientsQueries: IngredientsQueries,
    ) {}

    async createIngredient(ingredient: Ingredient) {
        await this.ingredientsQueries.upsertIngredient(ingredient);
    }

    async storeinRedis() {
        const ingredients = await this.ingredientsQueries.findManyIngredients();
        await this.cache.set('ingredients', ingredients, 0);
    }

    async findSimilarIngredients(ingredient: string) {
        const preparedIngredient = Prep.prepForMatching(ingredient);

        let ingredients = await this.ingredientsQueries.findManyIngredients();

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
    async getAll() {
        const ingredients = await this.ingredientsQueries.findManyIngredients();
        if (ingredients.length < 1) {
            throwError(() => new Error('No ingredients found'));
        }
        return ingredients;
    }
    async createIndex() {
        const ingredients = await this.ingredientsQueries.findManyIngredients();
        await this.ingredientSearchService.createIndex(ingredients);
    }
}
