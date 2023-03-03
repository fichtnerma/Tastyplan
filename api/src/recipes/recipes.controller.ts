import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PreferencesDto } from 'src/preferences/dto/createPreferences.dto';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Post('preferencesSelection')
    findWithPreferences(@Body() preferencesDto: PreferencesDto) {
        console.log(preferencesDto);

        return this.recipesService.findWithPreferences(preferencesDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }
}
