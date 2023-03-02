import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { PreferencesDto } from 'src/preferences/dto/createPreferences.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StepsService } from 'src/steps/steps.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
    constructor(private stepsService: StepsService, private ingredientsService: IngredientsService, private prismaService: PrismaService) {}

    async create(createRecipeDto: CreateRecipeDto) {
        //Get the ingredients
        // const ingredientNames = createRecipeDto.ingredients;
        // const ingredientsIds: { id: number }[] = [];
        // ingredientNames.forEach(async (item) => {
        //     const ingredient = await this.prismaService.ingredient.findUnique({
        //         where: {
        //             name: item,
        //         },
        //     });
        //     ingredientsIds.push({ id: ingredient.id });
        // });

        // //Create the recipe with the steps!
        // const recipe = this.prismaService.recipe.create({
        //     data: {
        //         name: createRecipeDto.name,
        //         cookingTime: createRecipeDto.cookingTime,
        //         difficulty: createRecipeDto.difficulty,
        //         img: createRecipeDto.img,
        //         type: createRecipeDto.type,
        //         kitchenware: createRecipeDto.kitchenware,
        //         preparingTime: createRecipeDto.preparingTime,
        //         steps: {
        //             create: [...createRecipeDto.steps],
        //         },
        //         ingredients: { connect: [...ingredientsIds] },
        //     },
        // });
        // return recipe;
        return 'This action adds a new recipe';
    }

    findAll() {
        return this.prismaService.recipe.findMany();
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
        const recipes = this.prismaService.recipe.findMany({
            where: {
                formOfDiet: preferencesDto.formOfDiet,
            },
        });
        return recipes;
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto) {
        return 'This action updates a recipe';
    }

    async remove(id: number) {
        return 'This action removes a recipe';
    }
}
