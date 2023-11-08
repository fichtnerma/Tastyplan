export function convertToTime(timeString: string) {
    if (!timeString) {
        return undefined;
    }
    const splitTimes = timeString.split(' ');
    let time = 0;
    for (let index = 0; index < splitTimes.length; index += 2) {
        const element = splitTimes[index];
        if (splitTimes[index + 1] === 'mins') {
            time += parseInt(element);
        } else if (splitTimes[index + 1] === 'hrs') {
            time += parseInt(element) * 60;
        }
    }
    return time;
}

export function shuffleArray(array: { id: number }[]) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
type IngredientAmount = {
    quantity: string;
    unit: string;
};
export function convertIngredientAmount(ingredientAmount: IngredientAmount, servings: number) {
    const { quantity, unit } = ingredientAmount;

    let updated_quantity = parseFloat(quantity);

    let updated_unit = unit;

    if (!unit) {
        updated_unit = null;
        if (!quantity) updated_quantity = null;
        else updated_quantity = parseFloat(quantity);
        return { quantity: updated_quantity, unit: updated_unit };
    } else if (unit === 'tablespoons' || unit === 'tablespoon') {
        updated_unit = 'tbsp';
        if (updated_quantity < 0.5) {
            updated_quantity = updated_quantity * 3;
            updated_unit = 'tsp';
        }
    } else if (unit === 'teaspoons' || unit === 'teaspoon') {
        updated_unit = 'tsp';
    } else if (unit === 'cup' || unit === 'cups') {
        updated_unit = 'cup';
    } else if (unit === 'pounds' || unit === 'pound') {
        updated_unit = 'g';
        updated_quantity = convertPoundsToGrams(updated_quantity);
    } else if (unit === 'ounces' || unit === 'ounce') {
        updated_unit = 'g';
        updated_quantity = convertOuncesToGrams(updated_quantity);
    }

    return { quantity: roundToNearest(updated_quantity), unit: updated_unit };
}

const convertTableSpoonsToGrams = (tablespoons: number, density: number) => {
    return tablespoons * 14.7868 * density;
};

const convertCupsToGrams = (cups: number, density: number) => {
    return cups * 236.588 * density;
};

const convertOuncesToGrams = (ounces: number) => {
    return ounces * 28.3495;
};

const convertPoundsToGrams = (pounds: number) => {
    return pounds * 453.592;
};

const roundToNearest = (num: number) => {
    if (num == null) return null;
    const floored = (Math.round(num * 4) / 4).toFixed(2);
    return +floored;
};
