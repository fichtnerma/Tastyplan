import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PreferencesDto } from 'src/preferences/dto/createPreferences.dto';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) { }

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Post('preferencesSelection')
    findWithPreferences(@Body() preferencesDto:PreferencesDto) {
        console.log(preferencesDto);
        
        return this.recipesService.findWithPreferences(preferencesDto)
    }

    @Get()
    findAll() {
        return this.recipesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findById(+id);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(+id, updateRecipeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipesService.remove(+id);
    }
}
