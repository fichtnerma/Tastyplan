export interface ISteps {
    stepCount: number;
    description: string;
}

export interface IngredientsWithAmount {
    amount: string;
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
        ingredient: { name: string; id: number };
    };
}
