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

export type IconMetaData = {
    id: number;
    src: string;
    text: string;
};

export type Ingredient = {
    id?: number;
    ingredient?: { name: string };
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
    hasDinner: boolean;
    hasLunch: boolean;
    weekplanEntry: Array<WeekplanEntry>;
};

export type WeekplanEntry = {
    id: string;
    date: string;
    lunch?: Recipe;
    dinner?: Recipe;
};

export type CustomCheckboxInput = {
    id: string;
    label: string;
    value: string;
    checked: boolean;
};

export type ShoppingListItem = {
    id: number;
    ingredientId: number;
    ingredientName: string;
    category?: string;
    unit: string;
    quantity: number;
    isChecked: boolean;
};

export type CustomSelectionInputGroups = {
    [key: string]: CustomCheckboxInput[];
};

export type CategorizedIngredients = {
    [key: string]: ShoppingListItem[];
};

export type CustomSVG = {
    class: string;
    src: string;
    width: number;
    height: number;
};

export type Favorite = {
    id: number;
    recipe: Recipe;
    recipeId: number;
    userId: string;
};

export type Option = {
    value: string;
    label: string;
};

export type Allergen = {
    name: string;
};
