import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService) {}

    async setPreferences(createPreferencesDto: PreferencesDto, user: any) {
        const ingredientNames = createPreferencesDto.foodDislikes;

        const ingredientsIds: { id: number }[] = [];
        ingredientNames.forEach(async (item) => {
            const ingredient = await this.prismaService.ingredient.findUnique({
                where: {
                    id: item.id,
                },
            });
            ingredientsIds.push({ id: ingredient.id });
        });

        try {
            console.log(createPreferencesDto);
            await this.prismaService.preferences.upsert({
                where: {
                    id: user.id,
                },
                update: {
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergenes: [...createPreferencesDto.allergenes],
                    foodDislikes: { connect: [...ingredientsIds] },
                },
                create: {
                    formOfDiet: createPreferencesDto.formOfDiet,
                    allergenes: [...createPreferencesDto.allergenes],
                    foodDislikes: { connect: [...ingredientsIds] },
                },
            });

            return 'Preferences has been send successfully';
        } catch (error) {
            throw error;
        }
    }
}
