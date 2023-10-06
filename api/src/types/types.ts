export interface ISteps {
    stepCount: number;
    description: string;
}

export interface IngredientsWithAmount {
    amount: string;
    condition: string;
    unit: string;
    ingredient: string;
}

export interface HeadersWithUser {
    user: string;
}

export interface JwtToken {
    expiresIn: string;
    Authorization: string;
}

export interface IngredientMap {
    [key: string]: {
        id: number;
        quantity: number;
        unit: string;
        ingredient: { name: string; id: number; categories: string };
    };
}

export interface CategorizedShoppingListMap {
    [key: string]: ShoppinglistItem[];
}
interface ShoppinglistItem {
    ingredientId: number;
    ingredientName: string;
    unit: string;
    quantity: number;
    isChecked: boolean;
}

export enum UserState {
    finished = 'finished',
    registration = 'registration',
}

export interface WeekplanEntry {
    date: Date;
    lunchId?: number;
    dinnerId?: number;
}
