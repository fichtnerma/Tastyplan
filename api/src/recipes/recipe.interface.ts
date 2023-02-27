import { Ingredient } from 'src/ingredients/ingredient.interface';
import { Step } from 'src/steps/step.interface';

export interface RecipeInterface {
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
}
