import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    ClassSerializerInterceptor,
    UseGuards,
    UseInterceptors,
    Req,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/add')
    async addOrDelete(@Body() addFavoriteDto: AddFavoriteDto, @Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return await this.favoritesService.addOrDelete(addFavoriteDto, user);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async findAll(@Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return this.favoritesService.findAllFavorites(user);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
