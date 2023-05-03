import { Controller } from '@nestjs/common';
import { Body, Get, Patch, Param } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

@Controller('shopping-list')
export class ShoppingListController {
    constructor(private shoppingListService: ShoppingListService) { }

    @Get(':userId')
    find(@Param('userId') userId: string) {
        return this.shoppingListService.findShoppingList(userId)
    }

    @Patch('/update/:userId')
    updateShoppingList(@Param('userId') userId: string, @Body() updateShoppingListDto: UpdateShoppingListDto) {
        return this.shoppingListService.upadteShoppingListEntry(userId, updateShoppingListDto)
    }
}
