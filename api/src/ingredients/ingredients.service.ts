import IngredientsSearchService from './ingredientsSearch.service';
import { IngredientsQueries } from './ingredients.queries';
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
