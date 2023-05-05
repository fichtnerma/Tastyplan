import { RecipesService } from './recipes.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }
}
