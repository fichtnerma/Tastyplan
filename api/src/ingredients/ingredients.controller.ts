import { IngredientsService } from './ingredients.service';
import { Cache } from 'cache-manager';
import { Controller, Get, Inject, Query, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
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
        try {
            if (search) {
                return this.ingredientsService.searchForIngredients(search);
            }
            return [];
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('/all')
    async getAllIngredients() {
        try {
            return this.ingredientsService.getAll();
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
