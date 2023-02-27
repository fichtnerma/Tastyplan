import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Step } from 'src/steps/entities/step.entity';
import { StepsService } from 'src/steps/steps.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
    constructor(private stepsService: StepsService, private ingredientsService: IngredientsService, private prismaService: PrismaService) {}

    async create(createRecipeDto: CreateRecipeDto) {
        //Get the ingredients
        const ingredientNames = createRecipeDto.ingredients;
        const ingredientsIds: { id: number }[] = [];
        ingredientNames.forEach(async (item) => {
            const ingredient = await this.prismaService.ingredient.findUnique({
                where: {
                    name: item,
                },
            });
            ingredientsIds.push({ id: ingredient.id });
        });

        //Create the recipe with the steps!
        const recipe = this.prismaService.recipe.create({
            data: {
                name: createRecipeDto.name,
                cookingTime: createRecipeDto.cookingTime,
                preparingTime: createRecipeDto.preparingTime,
                steps: {
                    create: [...createRecipeDto.steps],
                },
                ingredients: { connect: [...ingredientsIds] },
            },
        });
        return recipe;
    }

    findAll() {
        return this.prismaService.recipe.findMany();
    }

    /* async findById(id: number) {
        const recipe = await this.recipeRepository.findOneBy({ id: id });
        // const recipe = this.recipeRepository.findOne(id);
        if (recipe) {
            return recipe;
        }
        throw new HttpException(`Recipe with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto) {
        // const ingredientsPromises: Promise<Ingredient>[] = updateRecipeDto.ingredients.map((ingredient) => {
        //     return this.ingredientsService.findOne(ingredient);
        // });
        const stepsPromises: Promise<Step>[] = updateRecipeDto.steps.map((step) => this.stepsService.findOne(step));
        // const ingredients = await Promise.all([...ingredientsPromises]);
        const steps = await Promise.all([...stepsPromises]);
        const recipeObj = new Recipe();
        recipeObj.name = updateRecipeDto.name;
        recipeObj.steps = steps;
        // recipeObj.ingredients = ingredients;
        await this.recipeRepository.update(id, recipeObj);
        const updateRecipe = await this.recipeRepository.findOneBy({ id: id });
        if (updateRecipe) {
            return updateRecipe;
        }
        throw new HttpException(`Recipe with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    async remove(id: number) {
        const deleteResponse = await this.recipeRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException(`Recipe with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
    } */
}
