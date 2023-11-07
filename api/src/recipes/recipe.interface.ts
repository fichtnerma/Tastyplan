import { Recipe, Step } from '@prisma/client';

export type ExtendetRecipe = Recipe & {
    steps: Step[];
    ingredients: { ingredientId: number }[];
};

//Only purpose is here to get the times in strings
//Defenietly not the best way to do it
export type RecipeInput = ExtendetRecipe & {
    cookingTime: string;
    totalTime: string;
    prepareTime: string;
};
