import { Controller, Get, Query } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Get('')
    async getIngredients(@Query('search') search: string) {
        console.log('search', search);

        if (search) {
            return this.ingredientsService.searchForIngredients(search);
        }
        return [];
    }
}
