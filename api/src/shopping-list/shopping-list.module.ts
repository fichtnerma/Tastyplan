import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListQueries } from './shopping-list-queries';
import { RecipesModule } from 'src/recipes/recipes.module';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ShoppingListController],
    providers: [ShoppingListService, ShoppingListQueries],
    exports: [ShoppingListService],
    imports: [RecipesModule],
})
export class ShoppingListModule {}
