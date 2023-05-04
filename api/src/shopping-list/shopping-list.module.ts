import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
  exports: [ShoppingListService],
  imports: [RecipesModule]
})
export class ShoppingListModule { }
