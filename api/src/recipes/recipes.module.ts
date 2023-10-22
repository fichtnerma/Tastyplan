import { RecipesFilterService } from './recipesFilter.service';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [IngredientsModule],
    exports: [RecipesService],
    controllers: [RecipesController],
    providers: [RecipesService, RecipesFilterService],
})
export class RecipesModule {}
