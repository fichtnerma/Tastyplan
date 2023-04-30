import { IngredientsService } from './ingredients.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Get('')
    async getIngredients(@Query('search') search: string) {
        if (search) {
            return this.ingredientsService.searchForIngredients(search);
        }
        return [];
    }
}
