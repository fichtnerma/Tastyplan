import { Recipe, Weekplan, WeekplanEntry } from '@prisma/client';

export type IWeekplan = Weekplan & {
    weekplanEntry: IWeekplanEntry[];
};
export type IWeekplanEntry = WeekplanEntry & {
    recipe: Recipe;
};
