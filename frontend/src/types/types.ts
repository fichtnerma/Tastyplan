export type FormOfDiet = 'Omnivor' | 'Flexitarisch' | 'Pescetarisch' | 'Vegetarisch' | 'Vegan';
export type Intolerance =
    | 'Erdnuss'
    | 'Haselnus'
    | 'Walnuss'
    | 'Schalenfrucht'
    | 'Soja'
    | 'Gluten'
    | 'Fruktose'
    | 'Ei'
    | 'Laktose'
    | 'Schalentiere'
    | 'Fisch'
    | 'Alkohol';

export const isFormOfDiet = (str: string): str is FormOfDiet => {
    return (
        str === 'Omnivor' ||
        str === 'Flexitarisch' ||
        str === 'Pescetarisch' ||
        str === 'Vegetarisch' ||
        str === 'Vegan'
    );
};

export const isIntolerance = (str: string): str is Intolerance => {
    return (
        str === 'Erdnuss' ||
        str === 'Haselnus' ||
        str === 'Walnuss' ||
        str === 'Schalenfrucht' ||
        str === 'Soja' ||
        str === 'Gluten' ||
        str === 'Fruktose' ||
        str === 'Ei' ||
        str === 'Laktose' ||
        str === 'Schalentiere' ||
        str === 'Fisch' ||
        str === 'Alkohol'
    );
};

export type Step = {
    title: string;
    choices: FormOfDiet[] | Intolerance[];
    isMultiSelection: boolean;
    slug: string;
};

export type DietDTO = {
    formOfDiet: FormOfDiet;
    intolerances: Intolerance[];
};
