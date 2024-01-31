// Import necessary testing libraries and dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import CardContent from '../CardContent';

const mockRecipe = {
    cookingTime: 60,
    description: 'Test Recipe description',
    formOfDiet: 'vegan',
    id: 1,
    img: 'test.jpg',
    ingredients: [{ id: 1, quantity: 1, unit: 'test' }],
    name: 'Test Recipe',
    preparingTime: 20,
    steps: [{ description: 'test', stepCount: 1 }],
    totalTime: 80,
};

describe('CardContent component', () => {
    it('renders without errors', () => {
        render(<CardContent recipe={mockRecipe} />);
        expect(screen.getByAltText('Food Img')).toBeInTheDocument();
        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
});
