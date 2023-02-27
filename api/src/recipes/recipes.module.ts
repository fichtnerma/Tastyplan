import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { StepsModule } from 'src/steps/steps.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe]), StepsModule, IngredientsModule],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
