import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { RecipesModule } from 'src/recipes/recipes.module';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ShoppingListController],
    providers: [ShoppingListService],
    exports: [ShoppingListService],
    imports: [RecipesModule],
})
export class ShoppingListModule {}
