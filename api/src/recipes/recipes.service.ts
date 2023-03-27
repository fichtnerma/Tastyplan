import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { PreferencesDto } from 'src/preferences/dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
    constructor(private ingredientsService: IngredientsService, private prismaService: PrismaService) {}

    async create(createRecipeDto: CreateRecipeDto) {
        return 'This action adds a new recipe';
    }

    async findById(id: number) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: {
                id: id,
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                steps: true,
            },
        });
        const formattedRecipe = {
            id: recipe.id,
            name: recipe.name,
            img: recipe.img,
            formOfDiet: recipe.formOfDiet,
            difficulty: recipe.difficulty,
            preparingTime: recipe.preparingTime,
            cookingTime: recipe.cookingTime,
            ingredients: recipe.ingredients.map((item) => {
                return {
                    amount: item.amount,
                    ingredient: item.ingredient.name,
                };
            }),
            steps: recipe.steps.map((item) => {
                return {
                    stepCount: item.stepCount,
                    description: item.description,
                };
            }),
        };
        return formattedRecipe;
    }

    findWithPreferences(preferencesDto: PreferencesDto) {
        console.log(preferencesDto);

        const recipes = this.prismaService.recipe.findMany({
            where: {
                formOfDiet: preferencesDto.formOfDiet,
            },
            select: {
                id: true,
            },
        });
        return recipes;
    }
}
