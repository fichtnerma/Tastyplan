import { PreferencesQueries } from './preferences.queries';
import { IPreferences } from './preferences.interface';
import { PreferencesDto } from './dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService, private preferencesQueries: PreferencesQueries) {}

    async setPreferences(createPreferencesDto: PreferencesDto, userId: string) {
        try {
            const ingredientNames = createPreferencesDto.foodDislikes;
            const CheckIngredientsPromise = ingredientNames.map(async (item) => {
                const ingredient = await this.preferencesQueries.findUniqueIngredient(+item.id);
                return { id: ingredient.id };
            });
            const ingredientIds = await Promise.all(CheckIngredientsPromise);
            const preferences: IPreferences = {
                formOfDiet: createPreferencesDto.formOfDiet,
                allergens: [...createPreferencesDto.allergens],
                foodDislikes: { connect: [...ingredientIds] },
                days: [...createPreferencesDto.days],
                wantsDinner: createPreferencesDto.meals.includes(1) ? true : false,
                wantsLunch: createPreferencesDto.meals.includes(0) ? true : false,
                servings: createPreferencesDto.servings,
            };
            await Promise.all([this.preferencesQueries.upsertPreferences(userId, preferences)]);
            return 'Preferences has been send successfully';
        } catch (error) {
            throw new HttpException('setting prefernces failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPreferences(userId: string) {
        try {
            return await this.preferencesQueries.findUniqueUser(userId);
        } catch (error) {
            throw new InternalServerErrorException('Error: Getting the preferences failed');
        }
    }
}
