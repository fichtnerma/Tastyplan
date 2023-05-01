import { ISteps } from 'src/types/types';
import { IIngredient } from 'src/ingredients/ingredient.interface';

export interface IRecipe {
    id: number;
    name: string;
    description: string;
    ingredients: IIngredient[];
    steps: ISteps[];
    img: string;
    difficulty: string;
    preparingTime: number;
    cookingTime: number;
    formOfDiet: string;
}
