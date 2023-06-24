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
    async addOrDelete(@Body() addFavoriteDto: AddFavoriteDto, @Req() request: RequestWithUser) {
        const user = request.user as User;
        return await this.favoritesService.addOrDelete(addFavoriteDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async findAll(@Req() request: RequestWithUser) {
        const user = request.user as User;
        console.log({user});
        
        return await this.favoritesService.findAll(user);
    }
}
