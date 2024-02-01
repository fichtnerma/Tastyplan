import { debounce, getFormOfDietIcon, calculateMinutesToHours, getImageRessourcePath, truncate } from '../utils';

jest.useFakeTimers();

describe('debounce', () => {
    it('should debounce a function', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn);

        debouncedFn();
        debouncedFn();
        jest.runAllTimers();

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});

describe('getFormOfDietIcon', () => {
    it('should return the correct diet icon', () => {
        expect(getFormOfDietIcon('vegetarian')).toBe('vegetarian');
        expect(getFormOfDietIcon('vegan')).toBe('vegan');
        expect(getFormOfDietIcon('pescetarian')).toBe('pescetarian');
        expect(getFormOfDietIcon(undefined)).toBe('omnivore');
    });
});

describe('calculateMinutesToHours', () => {
    it('should calculate minutes to hours format', () => {
        expect(calculateMinutesToHours(90)).toBe('1 h 30 min');
        expect(calculateMinutesToHours(45)).toBe('45 min');
        expect(calculateMinutesToHours(0)).toBe('');
    });
});

describe('getImageRessourcePath', () => {
    it('should return the correct image resource path', () => {
        const imagePath = '/service/images/example.jpg';

        expect(getImageRessourcePath('http://example.com/image.jpg')).toBe('http://example.com/image.jpg');
        expect(getImageRessourcePath('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
        expect(getImageRessourcePath('example.jpg')).toBe(imagePath);
    });
});

describe('truncate', () => {
    it('should truncate text', () => {
        const text = 'This is a long text to be truncated';

        expect(truncate(text, 10)).toBe('This is a ...');
        expect(truncate(text, 100)).toBe(text);
    });
});
