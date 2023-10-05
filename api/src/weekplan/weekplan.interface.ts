import { Recipe, Weekplan } from '@prisma/client';

export type IWeekplan = Weekplan & {
    weekplanEntry: IWeekplanEntry[];
};
export type IWeekplanEntry = {
    date: Date;
    lunch?: Recipe;
    dinner?: Recipe;
};

export type IFormattedWeekplan = Pick<Weekplan, 'startDate' | 'endDate'> & {
    weekplanEntry: {
        date: Date;
        lunch: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'formOfDiet'>;
        dinner: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'formOfDiet'>;
    }[];
};
