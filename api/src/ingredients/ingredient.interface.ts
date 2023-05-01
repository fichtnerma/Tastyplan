export interface IIngredient {
    id: number;
    name: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugar: number;
    salt: number;
}

export interface IngredientSearchResult {
    hits: {
        total: number;
        hits: Array<{
            _source: IngredientSearchBody;
        }>;
    };
}

export interface IngredientSearchBody {
    id: number;
    name: string;
}
