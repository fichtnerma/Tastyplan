import { RecipesUploadImageService } from './recipesUploadImage.service';
import { RecipesSearchService } from './recipesSearch.service';
import { RecipesFilterService } from './recipesFilter.service';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipeQueries } from './recipe.queries';
import { SearchModule } from 'src/search/search.module';
import { PreferencesService } from 'src/preferences/preferences.service';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [IngredientsModule, PreferencesModule, SearchModule],
    exports: [RecipesService, RecipesFilterService, RecipesSearchService, RecipeQueries],
    controllers: [RecipesController],
    providers: [
        RecipesService,
        RecipesFilterService,
        RecipeQueries,
        RecipesSearchService,
        RecipesUploadImageService,
        PreferencesService,
    ],
})
export class RecipesModule {}
