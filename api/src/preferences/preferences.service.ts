import { UserState } from 'src/types/types';
import { PreferencesDto } from './dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService) {}

    async setPreferences(createPreferencesDto: PreferencesDto, userId: string) {
        try {
            const ingredientNames = createPreferencesDto.foodDislikes;
            const wantsLunch = createPreferencesDto.meals.includes(0) ? true : false;
            const wantsDinner = createPreferencesDto.meals.includes(1) ? true : false;
            const CheckIngredientsPromise = ingredientNames.map(async (item) => {
                const ingredient = await this.prismaService.ingredient.findUnique({
                    where: {
                        id: +item.id,
                    },
                });
                return { id: ingredient.id };
            });
            const ingredientIds = await Promise.all(CheckIngredientsPromise);
            await this.prismaService.preferences.upsert({
                where: {
                    userId: userId,
                },
                update: {
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergens: [...createPreferencesDto.allergens],
                    foodDislikes: { connect: [...ingredientIds] },
                    days: [...createPreferencesDto.days],
                    wantsDinner: wantsDinner,
                    wantsLunch: wantsLunch,
                    servings: createPreferencesDto.servings,
                },
                create: {
                    userId: userId,
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergens: [...createPreferencesDto.allergens],
                    foodDislikes: { connect: [...ingredientIds] },
                    days: [...createPreferencesDto.days],
                    wantsDinner: wantsDinner,
                    wantsLunch: wantsLunch,
                    servings: createPreferencesDto.servings,
                },
            });
            await this.prismaService.user.update({
                where: {
                    userId: userId,
                },
                data: {
                    state: UserState.finished,
                },
            });
            return 'Preferences has been send successfully';
        } catch (error) {
            throw new HttpException('setting prefernces failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPreferences(userId: string) {
        try {
            const preferences = await this.prismaService.preferences.findUnique({
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
            return preferences;
        } catch (error) {
            throw new InternalServerErrorException('Error: Getting the preferences failed');
        }
    }
}
