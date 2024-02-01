import Prep from '../MatchingPrep';
import { convertIngredientAmount, convertToTime, shuffleArray } from '../converter.utils';

describe('helpers', () => {
    describe('converter.utils.ts', () => {
        describe('convertIngredientAmount', () => {
            it('Should returned formatted in minutes', () => {
                expect(convertToTime('30 mins')).toBe(30);
            });
            it('Should return hours in minutes', () => {
                expect(convertToTime('1 hrs')).toBe(60);
            });
            it('Should return mixture of hours and minutes as minutes', () => {
                expect(convertToTime('1 hrs 30 mins')).toBe(90);
            });
            it('Should return 0 for 0', () => {
                expect(convertToTime('0')).toBe(0);
            });
        });
        describe('shuffleArray', () => {
            it('Should return shuffled array with same length', () => {
                const exampleArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
                expect(shuffleArray([...exampleArray]).length).toBe(exampleArray.length);
            });
        });
        describe('convertIngredientAmount', () => {
            it('Should return just value and null unit in case no unit inpit', () => {
                const ingredientAmount = { quantity: '2', unit: '' };
                expect(convertIngredientAmount(ingredientAmount)).toEqual({ quantity: 2, unit: null });
            });
            it('Should convert tablespoons to tsp if quantity is less than 0.5 (0.25 mapping)', () => {
                const ingredientAmount = { quantity: '0.4', unit: 'tablespoons' };
                expect(convertIngredientAmount(ingredientAmount)).toEqual({ quantity: 1.25, unit: 'tsp' });
            });
            it('Should convert pounds to grams', () => {
                const ingredientAmount = { quantity: '1', unit: 'pounds' };
                expect(convertIngredientAmount(ingredientAmount)).toEqual({ quantity: 453.5, unit: 'g' });
            });
            it('Should convert ounces to grams', () => {
                const ingredientAmount = { quantity: '1', unit: 'ounces' };
                expect(convertIngredientAmount(ingredientAmount)).toEqual({ quantity: 28.25, unit: 'g' });
            });
        });
    });
    describe('MatchingPrep.ts', () => {
        describe('prepForMatching', () => {
            it('Should return proper string without fillword included', () => {
                expect(Prep.prepForMatching('2 tablespoons red pepper flakes')).toBe('2 tablespoons red pepper flakes');
            });
            it('Should return proper string when send with fillword', () => {
                expect(Prep.prepForMatching('small 2 tablespoons red pepper flakes')).toBe(
                    '2 tablespoons red pepper flakes',
                );
            });
            it('Should return proper string with multiple fillword input', () => {
                expect(Prep.prepForMatching('small cooked raw 2 tablespoons red pepper flakes')).toBe(
                    '2 tablespoons red pepper flakes',
                );
            });
            it('Should return proper string with Ingredient without amount input', () => {
                expect(Prep.prepForMatching('2 red pepper flakes')).toBe('2 red pepper flakes');
            });
            it('Should return proper string with Ingredient without amount and with fillword input', () => {
                expect(Prep.prepForMatching('raw 2 red pepper flakes')).toBe('2 red pepper flakes');
            });
            it('Should return Ingredient without amount and ingredient (with fillword) input', () => {
                expect(Prep.prepForMatching('raw 2')).toBe('2');
            });
        });
    });
});
