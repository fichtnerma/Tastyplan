import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Step } from 'src/steps/entities/step.entity';
import { StepsService } from 'src/steps/steps.service';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
        private stepsService: StepsService,
        private ingredientsService: IngredientsService,
    ) {}

    async create(createRecipeDto: CreateRecipeDto) {
        const ingredientsPromises: Promise<Ingredient>[] = createRecipeDto.ingredients.map((ingredient) => {
            return this.ingredientsService.findOne(ingredient);
        });
        const stepsPromises: Promise<Step>[] = createRecipeDto.steps.map((step) => this.stepsService.findOne(step));
        const ingredients = await Promise.all([...ingredientsPromises]);
        const steps = await Promise.all([...stepsPromises]);
        const recipeObj = new Recipe();
        recipeObj.name = createRecipeDto.name;
        recipeObj.steps = steps;
        recipeObj.ingredients = ingredients;

        const recipe = await this.recipeRepository.create(recipeObj);
        this.recipeRepository.save(recipe);
        return recipe;
    }

    findAll() {
        return this.recipeRepository.find();
    }

    async findById(id: number) {
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
    }
}
