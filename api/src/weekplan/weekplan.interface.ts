import { WeekplanEntry } from 'src/types/types';
import { Recipe, Weekplan } from '@prisma/client';

export type IWeekplan = Weekplan & {
    weekplanEntry: IWeekplanEntry[];
};
export type IWeekplanEntry = {
    id: number;
    date: Date;
    lunch?: Recipe;
    dinner?: Recipe;
};

export type IFormattedWeekplan = Pick<Weekplan, 'startDate' | 'endDate' | 'hasLunch' | 'hasDinner'> & {
    weekplanEntry: {
        date: Date;
        lunch: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'formOfDiet'>;
        dinner: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'formOfDiet'>;
    }[];
};

export type CreateWeekplan = {
    userId: string;
    startDate: Date;
    endDate: Date;
    hasLunch: boolean;
    hasDinner: boolean;
    weekplanEntry: WeekplanEntry[];
};
