export const mailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export type APIRegistrationResponse = {
    response: string;
    status: number;
    message: string;
    name: string;
};
export enum Role {
    user = 'user',
    admin = 'admin',
    guest = 'guest',
}

export type APISearchResponse = {
    id: number;
    name: string;
};

export type UserCredentials = {
    userId: string;
    password: string;
};

export type Recipe = {
    cookingTime: number;
    description: string;
    formOfDiet: string;
    id: number;
    img: string;
    ingredients: Array<Ingredient>;
    name: string;
    preparingTime: number;
    steps: Array<Step>;
    totalTime: number;
};

export type Ingredient = {
    ingredient: { name: string };
    quantity: number;
    unit: string;
};

export type Step = {
    description: string;
    stepCount: number;
};

export type Weekplan = {
    endDate: string;
    startDate: string;
    weekplanEntry: Array<WeekplanEntry>;
};

export type WeekplanEntry = {
    date: string;
    recipe: Recipe;
};

export type CustomSelectionInput = {
    id: string;
    label: string;
    checked: boolean;
};

export type ShoppingListItem = {
    shoppingListEntryId: number;
    ingredientId: number;
    ingredientName: string;
    unit: string;
    quantity: number;
    isChecked: boolean;
};

export type CustomSVG = {
    class: string;
    src: string;
    width: number;
    height: number;
};
