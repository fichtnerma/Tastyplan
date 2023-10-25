import { FavoritesQueries } from './favorites.queries';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService, private favoritesQueries: FavoritesQueries) {}

    //There could be an issue with this return statement regarding async execution order
    //return probably is triggered before the method e.g. deleteManyFavorites has finished
    //For now no big problem because retun is just string
    async addOrDelete(addFavoriteDto: AddFavoriteDto, user: User) {
        const found = await this.favoritesQueries.findFirstFavorite(user.userId, parseInt(addFavoriteDto.recipeId));

        if (found) {
            await this.favoritesQueries.deleteManyFavorites(user.userId, parseInt(addFavoriteDto.recipeId));

            return 'Removed Favorite';
        }
        await this.favoritesQueries.createFavorite(user.userId, parseInt(addFavoriteDto.recipeId));
        return 'New favorite added';
    }

    async findAll(user: User) {
        return await this.favoritesQueries.findManyFavorites(user.userId);
    }

    async findAllFavorites(user: User) {
        const favorites = await this.findAll(user);
        const recipes = favorites.map((favorite) => favorite.recipe);
        return recipes;
    }
}
