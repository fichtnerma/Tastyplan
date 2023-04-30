import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }
}
