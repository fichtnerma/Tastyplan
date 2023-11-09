import { IPreferences } from './preferences.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreferencesQueries {
    constructor(private prismaService: PrismaService) {}

    async findUniqueIngredient(itemId: number) {
        return await this.prismaService.ingredient.findUnique({
            where: {
                id: itemId,
            },
        });
    }
    async upsertPreferences(userId: string, preferences: IPreferences) {
        await this.prismaService.preferences.upsert({
            where: {
                userId: userId,
            },
            update: {
                ...preferences,
            },
            create: {
                ...preferences,
                userId: userId,
            },
        });
    }
    async updateUser(userId: string, userStateFinished: string) {
        await this.prismaService.user.update({
            where: {
                userId: userId,
            },
            data: {
                state: userStateFinished,
            },
        });
    }
    async findUniquePreferences(userId: string) {
        return await this.prismaService.preferences.findUnique({
            where: {
                userId: userId,
            },
            select: {
                formOfDiet: true,
                allergens: true,
                servings: true,
                days: true,
                wantsLunch: true,
                wantsDinner: true,
                foodDislikes: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
}
