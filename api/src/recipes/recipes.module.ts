import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [IngredientsModule, PreferencesModule],
    exports: [RecipesService],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
