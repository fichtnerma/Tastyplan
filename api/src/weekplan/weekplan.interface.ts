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
        id: number;
        lunch: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'totalTime' | 'formOfDiet'>;
        dinner: Pick<Recipe, 'id' | 'name' | 'img' | 'preparingTime' | 'cookingTime' | 'totalTime' | 'formOfDiet'>;
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
