import { Session } from 'next-auth';
import {
    debounce,
    getFormOfDietIcon,
    calculateMinutesToHours,
    fetchWithAuth,
    fetchWithAuthFormData,
    mapShoppingListToSelection,
    getImageRessourcePath,
    truncate,
} from '../utils';

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

// Mock fetch for testing
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe('fetchWithAuth', () => {
    it.skip('should fetch with authentication headers', () => {
        const session: Session | null = {
            user: {
                role: Role.guest,
                email: 'admin@admin.de',
                id: 'tst',
                state: 'state',
                token: { Authorization: 'yourToken', expires: '' },
                userId: 'asdf',
            },
            expires: '2022-12-31T23:59:59Z',
        };

        fetchWithAuth('https://example.com/api/data', { method: 'GET' }, session);

        expect(mockFetch).toHaveBeenCalledWith('https://example.com/api/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer yourToken',
            },
        });
    });
});

describe.skip('fetchWithAuthFormData', () => {
    it('should fetch with authentication headers and form data content type', () => {
        const session: Session | null = { user: { token: { Authorization: 'yourToken' } } };

        fetchWithAuthFormData('https://example.com/api/data', { method: 'POST' }, session);

        expect(mockFetch).toHaveBeenCalledWith('https://example.com/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer yourToken',
            },
        });
    });
});

describe('mapShoppingListToSelection', () => {
    it.skip('should map shopping list to selection list', () => {
        const ingredientList = [
            {
                ingredientId: 1,
                ingredientName: 'Ingredient 1',
                category: 'Spices',
                quantity: 2,
                unit: 'tsp',
                isChecked: true,
            },
            {
                ingredientId: 2,
                ingredientName: 'Ingredient 2',
                category: 'Vegetables',
                quantity: 1,
                unit: 'kg',
                isChecked: false,
            },
        ];

        const result = mapShoppingListToSelection(ingredientList);

        expect(result).toEqual([
            { id: '1', label: '2 tsp Ingredient 1', value: 'Ingredient 1', checked: true },
            { id: '2', label: '1 kg Ingredient 2', value: 'Ingredient 2', checked: false },
        ]);
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
