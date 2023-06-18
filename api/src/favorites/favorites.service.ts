import { AddFavoriteDto } from './dto/add-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService) {}

    async create(addFavoriteDto: AddFavoriteDto, user: User) {
        await this.prismaService.favorites.upsert({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: parseInt(addFavoriteDto.recipeId),
                },
            },
            update: {},
            create: {
                userId: user.id,
                recipeId: parseInt(addFavoriteDto.recipeId),
            },
        });
        return 'New favorite added';
    }

    findAll(user: User) {
        const favorites = this.prismaService.favorites.findMany({
            where: {
                userId: user.id,
            },
            include: {
                recipe: true,
            },
        });
        return favorites;
    }

    remove(recipeId: string, user: User) {
        this.prismaService.favorites.delete({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: parseInt(recipeId),
                },
            },
        });
        return `Removed #${recipeId}`;
    }
}
