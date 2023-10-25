import { PrismaService } from 'src/prisma/prisma.service';
import { Ingredient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsQueries {
    constructor(private prismaService: PrismaService) {}

    async upsertIngredient(ingredient: Ingredient) {
        return await this.prismaService.ingredient.upsert({
            where: { id: ingredient.id },
            update: {},
            create: {
                id: ingredient.id,
                name: ingredient.name.toLowerCase(),
                categories: ingredient.categories,
                subcategories: ingredient.subcategories,
                calories: parseFloat(`${ingredient.calories}`) || null,
                protein: parseFloat(`${ingredient.protein}`) || null,
                fat: parseFloat(`${ingredient.fat}`) || null,
                carbs: parseFloat(`${ingredient.carbs}`) || null,
                calcium: parseFloat(`${ingredient.calcium}`) || null,
                iron: parseFloat(`${ingredient.iron}`) || null,
                magnesium: parseFloat(`${ingredient.magnesium}`) || null,
                allergens: ingredient.allergens || [],
            },
        });
    }

    async findManyIngredients(): Promise<Ingredient[]> {
        return await this.prismaService.ingredient.findMany();
    }
}
