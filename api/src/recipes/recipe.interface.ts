import { Ingredient } from 'src/ingredients/ingredient.interface';

export interface RecipeInterface {
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
    steps: any[];
}
