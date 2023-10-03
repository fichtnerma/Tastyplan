import { IngredientsService } from './ingredients.service';
import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@Controller('ingredients')
@UseInterceptors(CacheInterceptor)
export class IngredientsController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly ingredientsService: IngredientsService,
    ) {}

    @Get('')
    async getIngredients(@Query('search') search: string) {
        if (search) {
            return this.ingredientsService.searchForIngredients(search);
        }
        return [];
    }
    @Get('/all')
    async getAllIngredients() {
        return this.ingredientsService.getAll();
    }
}
