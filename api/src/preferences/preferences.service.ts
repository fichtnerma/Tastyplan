import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService) {}

    async setPreferences(createPreferencesDto: PreferencesDto, user: User) {
        const ingredientNames = createPreferencesDto.foodDislikes;
        const CheckIngredientsPromise = ingredientNames.map(async (item) => {
            const ingredient = await this.prismaService.ingredient.findUnique({
                where: {
                    id: +item.id,
                },
            });
            return { id: ingredient.id };
        });
        const ingredientsIds = await Promise.all(CheckIngredientsPromise);

        try {
            await this.prismaService.preferences.upsert({
                where: {
                    userId: user.userId,
                },
                update: {
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergens: [...createPreferencesDto.allergens],
                    foodDislikes: { connect: [...ingredientsIds] },
                },
                create: {
                    userId: user.userId,
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergens: [...createPreferencesDto.allergens],
                    foodDislikes: { connect: [...ingredientsIds] },
                },
            });

            return 'Preferences has been send successfully';
        } catch (error) {
            throw error;
        }
    }

    async getPreferences(user: User) {
        const preferences = await this.prismaService.preferences.findUnique({
            where: {
                userId: user.userId,
            },
            select: {
                formOfDiet: true,
                allergens: true,
                foodDislikes: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return preferences;
    }
}
