import { Steps } from '../../types/types';
import { IngredientWithAmount } from '@prisma/client';

export class CreateRecipeDto {
    name: string;
    description: string;
    ingredients: IngredientWithAmount[];
    cookingTime: number;
    preparingTime: number;
    type: string;
    steps: Steps[];
    difficulty: string;
    img: string;
    kitchenware: string[];
}
