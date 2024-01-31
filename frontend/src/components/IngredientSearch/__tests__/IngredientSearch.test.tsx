import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import IngredientSearch from '../IngredientSearch';

describe('IngredientSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with initial values', () => {
        const { getByLabelText } = render(
            <IngredientSearch id="test" onIngredient={jest.fn()} selectedOption={undefined} />,
        );

        expect(getByLabelText('Ingredient search')).toBeInTheDocument();
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <IngredientSearch id="test" onIngredient={jest.fn()} selectedOption={undefined} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
