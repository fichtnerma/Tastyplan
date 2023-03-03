import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
    imports: [IngredientsModule],
    exports: [RecipesService],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
