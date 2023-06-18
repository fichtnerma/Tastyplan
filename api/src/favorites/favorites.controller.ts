import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ClassSerializerInterceptor,
    UseGuards,
    UseInterceptors,
    Req,
} from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/add')
    create(@Body() addFavoriteDto: AddFavoriteDto, @Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.favoritesService.create(addFavoriteDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    findAll(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.favoritesService.findAll(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':recipeId')
    remove(@Param('recipeId') recipeId: string, @Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.favoritesService.remove(recipeId, user);
    }
}
