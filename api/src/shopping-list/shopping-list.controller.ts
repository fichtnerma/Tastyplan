import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
    constructor(private shoppingListService: ShoppingListService) { }

    @Get(':userId')
    find(@Param('userId') userId: string) {
        return this.shoppingListService.findShoppingList(userId)
    }
}
