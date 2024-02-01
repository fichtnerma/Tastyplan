import { SessionProvider, useSession } from 'next-auth/react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import DetailView from '../DetailView';

const useAuthSession: typeof useSession = jest.fn().mockReturnValue({
    data: {
        user: {
            token: {
                Authorization:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDY3OTQ0ODksImV4cCI6MTcxMTk3ODQ4OX0.KlKpYJOR189c46UNfRyeYQ7H8D4EUoZcMLqPa-Iz26A',
            },
            id: 'e95720ca-9555-4d97-bc19-a5e75085a823',
            userId: 'email@email.com',
            role: 'user',
            state: 'registration',
            createdAt: '2024-02-01T13:34:45.564Z',
            updatedAt: '2024-02-01T13:34:45.564Z',
        },
    },
    error: undefined,
    refresh: jest.fn(),
});

const useSwitchRecipe = jest.fn().mockReturnValue({
    currentRecipeId: 1,
    switchRecipe: jest.fn(),
    hideDetailView: jest.fn(),
});

fetchMock.enableMocks();

describe('DetailView', () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({
            id: 1,
            name: 'Chicken with Creamy Sun-Dried Tomato Sauce',
            description:
                'This creamy sun-dried tomato chicken dinner is wonderful for company. Everything is cooked in one skillet, which makes it even better!',
            img: 'ChickenwithCreamySunDriedTomatoSauce.jpg',
            formOfDiet: 'vegetarian',
            preparingTime: 0,
            cookingTime: 30,
            totalTime: 50,
            ingredients: [
                {
                    id: 1,
                    quantity: 1814.25,
                    unit: 'g',
                    ingredient: {
                        name: 'chicken breast',
                        id: 371,
                        categories: 'Meat and offal',
                    },
                },
                {
                    id: 2,
                    quantity: null,
                    unit: null,
                    ingredient: {
                        name: 'salt',
                        id: 425,
                        categories: 'Miscellaneous',
                    },
                },
                {
                    id: 3,
                    quantity: null,
                    unit: null,
                    ingredient: {
                        name: 'pepper',
                        id: 666,
                        categories: 'Spices',
                    },
                },
                {
                    id: 4,
                    quantity: 10,
                    unit: 'tbsp',
                    ingredient: {
                        name: 'butter',
                        id: 960,
                        categories: 'Fats and oils',
                    },
                },
                {
                    id: 5,
                    quantity: 6,
                    unit: 'cloves',
                    ingredient: {
                        name: 'garlic',
                        id: 254,
                        categories: 'Vegetables',
                    },
                },
                {
                    id: 6,
                    quantity: 2,
                    unit: 'tsp',
                    ingredient: {
                        name: 'italian seasoning',
                        id: 794,
                        categories: 'Spices',
                    },
                },
                {
                    id: 7,
                    quantity: 0.5,
                    unit: 'tsp',
                    ingredient: {
                        name: 'red pepper flakes',
                        id: 738,
                        categories: 'Spices',
                    },
                },
                {
                    id: 8,
                    quantity: 1,
                    unit: 'cup',
                    ingredient: {
                        name: 'white wine',
                        id: 867,
                        categories: 'Alcoholic drinks',
                    },
                },
                {
                    id: 9,
                    quantity: 2,
                    unit: 'cup',
                    ingredient: {
                        name: 'chicken broth',
                        id: 746,
                        categories: 'Stews and soups',
                    },
                },
                {
                    id: 10,
                    quantity: 1.5,
                    unit: 'cup',
                    ingredient: {
                        name: 'heavy whipping cream',
                        id: 859,
                        categories: 'Milk and dairy products',
                    },
                },
                {
                    id: 11,
                    quantity: 1,
                    unit: 'cup',
                    ingredient: {
                        name: 'peeled tomatoes',
                        id: 1000,
                        categories: 'Vegetables',
                    },
                },
                {
                    id: 12,
                    quantity: 1,
                    unit: 'cup',
                    ingredient: {
                        name: 'basil',
                        id: 21,
                        categories: 'Vegetables',
                    },
                },
            ],
            steps: [
                {
                    stepCount: 1,
                    description:
                        'Place chicken breasts in a resealable plastic bag and pound to an even thickness. If breasts are very large, cut them in half. Season lightly with salt and pepper.',
                },
                {
                    stepCount: 2,
                    description:
                        'Melt 1/3 of the butter in a large nonstick skillet over medium heat and cook 1/2 of the chicken breasts until they are no longer pink in the center and the juices run clear, 5 to 10 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C). Remove from skillet and set aside. Melt another 1/3 of butter and repeat with the remaining chicken breasts. Set aside.',
                },
                {
                    stepCount: 3,
                    description:
                        'Melt remaining 1/3 of butter in the same skillet and add minced garlic, Italian seasoning, and red pepper flakes. Cook, stirring constantly, for 1 minute. Pour in wine and bring to a boil. Reduce heat and simmer for 2 minutes. Pour in chicken broth, return to a boil, reduce heat, and simmer for 5 minutes. Stir in cream and dried tomatoes. Simmer for 5 minutes.',
                },
                {
                    stepCount: 4,
                    description:
                        'Stir in basil and return chicken to the skillet. Cook until chicken is thoroughly heated and sauce has thickened, about 5 minutes.',
                },
            ],
        }),
    );
    it('should not have basic accessibility issues', async () => {
        act(async () => {
            const { container } = render(
                <SessionProvider>
                    <DetailView useSwitchRecipe={useSwitchRecipe} useAuthSession={useAuthSession} />
                </SessionProvider>,
            );
            const results = await axe(container);
            expect(results.violations).toHaveLength(0);
        });
    });
});
