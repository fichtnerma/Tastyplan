import { PreferencesQueries } from './preferences.queries';
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

            const preferences = this.formatPreferences(createPreferencesDto, ingredientIds);

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

    formatPreferences(preferences: PreferencesDto, ingredientIds: { id: number }[]) {
        return {
            formOfDiet: preferences.formOfDiet,
            allergens: [...preferences.allergens],
            foodDislikes: { connect: [...ingredientIds] },
            days: [...preferences.days],
            wantsLunch: preferences.wantsLunch,
            wantsDinner: preferences.wantsDinner,
            servings: preferences.servings,
        };
    }
}
