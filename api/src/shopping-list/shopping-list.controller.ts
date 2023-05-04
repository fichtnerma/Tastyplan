import { Controller, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Body, ClassSerializerInterceptor, Get, Patch, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiSecurity } from '@nestjs/swagger';
import { ShoppingListService } from './shopping-list.service';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { User } from '@prisma/client';
import { RequestWithUser } from 'src/users/users.controller';


@Controller('shopping-list')
export class ShoppingListController {
    constructor(private shoppingListService: ShoppingListService) { }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    find(@Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return this.shoppingListService.findShoppingList(user.userId)
        }
        catch (error) {
            throw new HttpException("Failed to find shopping list", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('/update/:shoppingListEntryId')
    updateShoppingList(@Param('shoppingListEntryId') entryId: string, @Body() updateShoppingListDto: UpdateShoppingListDto) {
        try {
            const parsedEntryId = parseInt(entryId)
            this.shoppingListService.upadteShoppingListEntry(parsedEntryId, updateShoppingListDto)
        }
        catch (error) {
            throw new HttpException("Failed to update", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return "Success: Shoppinglist entry was updated"
    }
}
