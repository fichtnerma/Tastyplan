import { Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { PreferencesDto } from 'src/preferences/dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
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
            description: recipe.description,
            img: recipe.img,
            formOfDiet: recipe.formOfDiet,
            preparingTime: recipe.preparingTime,
            cookingTime: recipe.cookingTime,
            totalTime: recipe.totalTime,
            ingredients: recipe.ingredients.map((item) => {
                return {
                    quantity: item?.quantity,
                    unit: item?.unit,
                    ingredient: item?.ingredient?.name,
                };
            }),
            steps: recipe.steps.map((item) => {
                return {
                    stepCount: item.stepCount,
                    description: item.description,
                };
            }),
        };
        console.log(formattedRecipe);

        return formattedRecipe;
    }
    //Condition: wehere non of the ingreedients has one of the given allergenes
    findWithPreferences(preferencesDto: PreferencesDto) {
        console.log(preferencesDto);

        const recipes = this.prismaService.recipe.findMany({
            select: {
                id: true,
            },
        });
        return recipes;
    }
}
