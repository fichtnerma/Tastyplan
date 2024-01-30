import Prep from '../MatchingPrep';
import { convertToTime } from '../converter.utils';

describe('Converter helper', () => {
    test('Minute input', () => {
        expect(convertToTime('30 mins')).toBe(30);
    });
    test('Hour input', () => {
        expect(convertToTime('1 hrs')).toBe(60);
    });
    test('Mixed minute and hour input', () => {
        expect(convertToTime('1 hrs 30 mins')).toBe(90);
    });
    test('Null input test', () => {
        expect(convertToTime('0')).toBe(0);
    });
});

describe('Matching prep helper', () => {
    test('Ingredient without fillword', () => {
        const returnedString = Prep.prepForMatching('2 tablespoons red pepper flakes');
        expect(returnedString).toBe('2 tablespoons red pepper flakes');
    });
    test('Ingredient with fillword', () => {
        const returnedString = Prep.prepForMatching('small 2 tablespoons red pepper flakes');
        expect(returnedString).toBe('2 tablespoons red pepper flakes');
    });
    test('Ingredient with multiple fillword', () => {
        const returnedString = Prep.prepForMatching('small cooked raw 2 tablespoons red pepper flakes');
        expect(returnedString).toBe('2 tablespoons red pepper flakes');
    });
    test('Ingredient without amount', () => {
        const returnedString = Prep.prepForMatching('2 red pepper flakes');
        expect(returnedString).toBe('2 red pepper flakes');
    });
    test('Ingredient without amount and with fillword', () => {
        const returnedString = Prep.prepForMatching('raw 2 red pepper flakes');
        expect(returnedString).toBe('2 red pepper flakes');
    });

    test('Ingredient without amount and ingredient (with fillword)', () => {
        const returnedString = Prep.prepForMatching('raw 2');
        expect(returnedString).toBe('2');
    });
    //handle null values
});
