import { IngredientWithAmount } from '@prisma/client';
import { Recipe, Step } from '@prisma/client';

export type ExtendetRecipe = Omit<Recipe, 'id'> & {
    steps: Step[];
    ingredients: {
        ingredientId: number;
        condition?: string | null;
        unit?: string | null;
        quantity?: number | null;
    }[];
};

//Only purpose is here to get the times in strings
//Defenietly not the best way to do it
export type RecipeInput = ExtendetRecipe & {
    cookingTime?: string;
    totalTime: string;
    prepareTime?: string;
};

export type CreateRecipeInput = {
    name: string;
    img?: string;
    totalTime?: number;
    servings: number;
    tags?: string[];
    formOfDiet: string;
    ingredients?: {
        ingredientId: number;
        condition?: string | null;
        unit?: string | null;
        quantity?: number | null;
    }[];
    steps?: {
        description: string;
        stepCount: number;
    }[];
    userId?: string | null;
};

export type RecipeWithIngredientName = Recipe & {
    steps: Step[];
    ingredients: (IngredientWithAmount & {
        ingredient: {
            name: string;
        };
    })[];
};
