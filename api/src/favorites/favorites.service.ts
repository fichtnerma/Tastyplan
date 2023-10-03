import { AddFavoriteDto } from './dto/add-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService) {}

    async addOrDelete(addFavoriteDto: AddFavoriteDto, user: User) {
        const found = await this.prismaService.favorites.findFirst({
            where: {
                userId: user.userId,
                recipeId: parseInt(addFavoriteDto.recipeId),
            },
        });

        if (found) {
            await this.prismaService.favorites.deleteMany({
                where: {
                    userId: user.userId,
                    recipeId: parseInt(addFavoriteDto.recipeId),
                },
            });
            return 'Removed Favorite';
        }

        await this.prismaService.favorites.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                recipe: {
                    connect: {
                        id: +addFavoriteDto.recipeId,
                    },
                },
            },
        });
        return 'New favorite added';
    }

    async findAll(user: User) {
        const favorites = await this.prismaService.favorites.findMany({
            where: {
                userId: user.userId,
            },
            select: {
                recipe: {
                    select: {
                        cookingTime: true,
                        description: true,
                        formOfDiet: true,
                        id: true,
                        img: true,
                        name: true,
                        preparingTime: true,
                        servings: true,
                        tags: true,
                        totalTime: true,
                    },
                },
            },
        });

        return favorites;
    }

    async remove(recipeId: string, user: User) {
        await this.prismaService.favorites.delete({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: parseInt(recipeId),
                },
            },
        });
        return `Removed #${recipeId}`;
    }

    async findAllFavorites(user: User) {
        const favorites = await this.findAll(user);
        const recipes = favorites.map((favorite) => favorite.recipe);
        return recipes;
    }
}
