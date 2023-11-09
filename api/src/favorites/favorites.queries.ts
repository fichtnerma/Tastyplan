import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesQueries {
    constructor(private prismaService: PrismaService) {}

    async findFirstFavorite(userId: string, recipeId: number) {
        return await this.prismaService.favorites.findFirst({
            where: {
                userId: userId,
                recipeId: recipeId,
            },
        });
    }
    async deleteManyFavorites(userId: string, recipeId: number) {
        await this.prismaService.favorites.deleteMany({
            where: {
                userId: userId,
                recipeId: recipeId,
            },
        });
    }
    async createFavorite(userId: string, recipeId: number) {
        await this.prismaService.favorites.create({
            data: {
                userId: userId,
                recipeId: recipeId,
            },
        });
        return 'New favorite added';
    }

    async findManyFavorites(userId: string) {
        return await this.prismaService.favorites.findMany({
            where: {
                userId: userId,
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
    }
}
