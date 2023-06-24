import { InitializerService } from './initializer.service';
import { RecipesModule } from 'src/recipes/recipes.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [IngredientsModule, RecipesModule],
    providers: [InitializerService],
})
export class InitializerModule {}
