import { PreferencesQueries } from './preferences.queries';
import { IPreferences } from './preferences.interface';
import { PreferencesDto } from './dto/createPreferences.dto';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PreferencesService {
    constructor(private preferencesQueries: PreferencesQueries) {}

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
                wantsLunch: createPreferencesDto.meals.includes('lunch') ? true : false,
                wantsDinner: createPreferencesDto.meals.includes('dinner') ? true : false,
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
            return await this.preferencesQueries.findUniquePreferences(userId);
        } catch (error) {
            throw new InternalServerErrorException('Error: Getting the preferences failed');
        }
    }
}
