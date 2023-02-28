import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { StepsModule } from 'src/steps/steps.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
    imports: [StepsModule, IngredientsModule],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
