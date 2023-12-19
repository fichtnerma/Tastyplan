import { Session } from 'next-auth';
import { CustomCheckboxInput, ShoppingListItem } from 'src/types/types';

export const debounce = (fn: (...params: unknown[]) => unknown, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const debounceWithPromise = <T extends (...params: unknown[]) => Promise<unknown>>(
  fn: T,
  ms = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let resolveFn: ((value?: unknown) => void) | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    return new Promise<unknown>((resolve) => {
      resolveFn = resolve;
      timeoutId = setTimeout(async () => {
        if (resolveFn) {
          const result = await fn.apply(this, args);
          resolveFn(result);
          resolveFn = null;
        }
      }, ms);
    });
  };
};


export function getFormOfDietIcon(formOfDiet: string | undefined) {
    if (formOfDiet == 'vegetarian') {
        return 'vegetarian';
    } else if (formOfDiet == 'vegan') {
        return 'vegan';
    } else if (formOfDiet == 'pescetarian') {
        return 'pescetarian';
    } else {
        return 'omnivore';
    }
}

export function calculateMinutesToHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const hoursString = hours > 0 ? hours + ' h' : '';
    const minString = min > 0 ? min + ' min' : '';
    return hoursString + ' ' + minString;
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

export function fetchWithAuthFormData(url: string, options: RequestInit = { method: 'GET' }, session: Session | null) {
    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${session?.user.token.Authorization}`,
        },
    });
}

export function mapShoppingListToSelection(ingredientList: ShoppingListItem[]): CustomCheckboxInput[] {
    const selectionList: CustomCheckboxInput[] = ingredientList.map((ingredient) => {
        return {
            id: ingredient.ingredientId + '',
            label: `${ingredient?.category === 'Spices' ? '' : ingredient.quantity} ${
                ingredient?.category === 'Spices' ? '' : ingredient.unit
            } ${ingredient.ingredientName}`,
            value: ingredient.ingredientName,
            checked: ingredient.isChecked,
        };
    });
    return selectionList;
}

export function getImageRessourcePath(imgString: string) {
    if (imgString.startsWith('http://') || imgString.startsWith('https://')) {
        return imgString;
    } else {
        return `/service/images/${imgString}`;
    }
}
