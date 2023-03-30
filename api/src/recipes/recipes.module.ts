import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { PreferencesModule } from 'src/preferences/preferences.module';

@Module({
    imports: [IngredientsModule, PreferencesModule],
    exports: [RecipesService],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
