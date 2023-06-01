import { Recipe, Weekplan, WeekplanEntry } from '@prisma/client';

export type IWeekplan = Weekplan & {
    weekplanEntry: IWeekplanEntry[];
};
export type IWeekplanEntry = WeekplanEntry & {
    recipe: Recipe;
};

export type IFormattedWeekplan = Pick<Weekplan, 'startDate' | 'endDate'> & {
    weekplanEntry: {
        date: Date;
        recipe: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'formOfDiet'>;
    }[];
};
