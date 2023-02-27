import { Steps } from '../../types/types'

export class CreateRecipeDto {
    name: string;
    description: string;
    ingredients: string[];
    cookingTime: number;
    preparingTime: number;
    steps: Steps[];
}
