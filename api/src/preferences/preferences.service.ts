import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/createPreferences.dto'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService) { }

    preferences(createPreferencesDto: PreferencesDto) {

        const ingredientNames = createPreferencesDto.foodDislikes;

        //For the MVP we are only working with the formOfDiet
        // const ingredientsIds: { id: number }[] = [];
        // ingredientNames.forEach(async (item) => {
        //     const ingredient = await this.prismaService.ingredient.findUnique({
        //         where: {
        //             name: item,
        //         },
        //     });
        //     ingredientsIds.push({ id: ingredient.id });
        // });

        try {
            //store the prefernces in the DB
            const preferences = this.prismaService.preferences.create({
                data: {
                    formOfDiet: createPreferencesDto.formOfDiet,
                    // allergenes: [...createPreferencesDto.allergenes],
                    // foodDislikes: { connect: [...ingredientsIds] },
                },
            });

            return "Preferences has been send successfully";
        } catch (error) {
            throw error;
        }
    }
}
