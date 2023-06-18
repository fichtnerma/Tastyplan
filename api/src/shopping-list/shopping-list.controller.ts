import { ShoppingListService } from './shopping-list.service';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Get, Patch, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Req } from '@nestjs/common';

@Controller('shopping-list')
export class ShoppingListController {
    constructor(private shoppingListService: ShoppingListService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    find(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.shoppingListService.findShoppingList(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('/update/:shoppingListEntryId')
    updateShoppingList(
        @Param('shoppingListEntryId') entryId: string,
        @Body() updateShoppingListDto: UpdateShoppingListDto,
    ) {
        const parsedEntryId = parseInt(entryId);
        this.shoppingListService.updateShoppingListEntry(parsedEntryId, updateShoppingListDto);
        return 'Success: Shoppinglist entry was updated';
    }
}
