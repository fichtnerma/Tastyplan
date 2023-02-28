import { Injectable } from '@nestjs/common';
import { CreatePreferencesDto } from './dto/preferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PreferencesService {
    constructor(private prismaService: PrismaService) {}

    preferences(createPreferencesDto: CreatePreferencesDto) {
        const ingredientNames = createPreferencesDto.foodDislikes;
        const ingredientsIds: { id: number }[] = [];
        ingredientNames.forEach(async (item) => {
            const ingredient = await this.prismaService.ingredient.findUnique({
                where: {
                    name: item,
                },
            });
            ingredientsIds.push({ id: ingredient.id });
        });

        try {
            const preferences = this.prismaService.preferences.create({
                data: {
                    foodType: createPreferencesDto.foodType,
                    allergenes: [...createPreferencesDto.allergenes],
                    foodDislikes: { connect: [...ingredientsIds] },
                },
            });
        } catch (error) {
            throw error;
        }
    }
}
