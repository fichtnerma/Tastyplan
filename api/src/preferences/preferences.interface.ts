export type IPreferences = {
    formOfDiet: string;
    allergens?: string[];
    foodDislikes?: {
        connect: { id: number }[];
    };
    days?: string[];
    wantsDinner: boolean;
    wantsLunch: boolean;
    servings: number;
};
