import { createContext, useContext } from 'react';

export function useSwitchRecipeContext() {
    const context = useContext(SwitchRecipeContext);
    return context;
}

export type SwitchRecipeContextType = {
    switchRecipe: (recipeId: number | undefined) => void;
    showDetailView: (recipeId: number | undefined) => void;
    hideDetailView: () => void;
    currentRecipeId: number | undefined;
};

export const SwitchRecipeContext = createContext<SwitchRecipeContextType | undefined>(undefined);
