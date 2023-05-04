import { Session } from 'next-auth';
import { CustomSelectionInput, ShoppingListItem } from 'src/types/types';

export const debounce = (fn: (...params: unknown[]) => unknown, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export function getFormOfDietIcon(formOfDiet: string | undefined) {
    if (formOfDiet == 'vegetarisch') {
        return 'vegetarian';
    } else if (formOfDiet == 'vegan') {
        return 'vegan';
    } else if (formOfDiet == 'pescetarian') {
        return 'pescetarian';
    } else {
        return 'omnivor';
    }
}

export function fetchWithAuth(url: string, options: RequestInit = { method: 'GET' }, session: Session | null) {
    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.token.Authorization}`,
        },
    });
}

export function mapShoppingListToSelection(ingredientList: ShoppingListItem[]): CustomSelectionInput[] {
    const selectionList: CustomSelectionInput[] = ingredientList.map((ingredient) => {
        return {
            id: ingredient.ingredientId + '',
            label: `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredientName}`,
            checked: ingredient.isChecked,
        };
    });
    return selectionList;
}
