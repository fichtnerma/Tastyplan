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