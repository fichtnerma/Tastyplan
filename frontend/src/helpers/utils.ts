export const debounce = (fn: (...params: unknown[]) => unknown, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: unknown[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  export function getFormOfDietIcon(formOfDiet: string | undefined) {
    if (formOfDiet == 'vegetarisch') {
        return '/Icons/Soja.svg';
    } else if (formOfDiet == 'vegan') {
        return '/Icons/vegetarian.png';
    } else if (formOfDiet == 'pescetarian') {
        return '/Icons/Fisch.svg';
    } else {
        return '/Icons/Steak_V2_Icon.svg';
    }
}