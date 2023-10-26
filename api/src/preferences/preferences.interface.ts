export type IPreferences = {
    formOfDiet: string;
    allergens?: string[];
    foodDislikes?: {
        connect: { id: number }[];
    };
    days?: number[];
    wantsDinner: boolean;
    wantsLunch: boolean;
    servings: number;
};
