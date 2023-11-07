import { RecipesFilterService } from './recipesFilter.service';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeQueries } from './recipe.queries';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [IngredientsModule, PreferencesModule],
    exports: [RecipesService, RecipesFilterService, RecipeQueries],
    controllers: [RecipesController],
    providers: [RecipesService, RecipesFilterService, RecipeQueries],
})
export class RecipesModule {}
