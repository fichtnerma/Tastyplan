import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import RecipeSteps from '../RecipeSteps';

describe('RecipeSteps', () => {
    const recipeMockEven = {
        cookingTime: 30,
        description: 'Test description',
        formOfDiet: 'Test diet',
        id: 1,
        img: 'Test image url',
        ingredients: [{ quantity: 1, id: 1, ingredient: { name: 'Test ingredient' }, unit: 'Test unit' }],
        name: 'Test name',
        preparingTime: 15,
        steps: [{ description: 'Test description', stepCount: 1 }],
        totalTime: 45,
    };

    const recipeMockOdd = {
        cookingTime: 30,
        description: 'Test description',
        formOfDiet: 'Test diet',
        id: 1,
        img: 'Test image url',
        ingredients: [{ quantity: 1, id: 1, ingredient: { name: 'Test ingredient' }, unit: 'Test unit' }],
        name: 'Test name',
        preparingTime: 15,
        steps: [
            { description: 'Test description', stepCount: 1 },
            { description: 'Test description', stepCount: 2 },
        ],
        totalTime: 45,
    };

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<RecipeSteps recipe={recipeMockEven} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText } = render(<RecipeSteps recipe={recipeMockEven} />);

        expect(getByText('The Recipe')).toBeInTheDocument();
        expect(getByText('Step 1')).toBeInTheDocument();
        expect(getByText('Test description')).toBeInTheDocument();
    });

    it('renders component with odd number of steps', () => {
        const { getByText, getAllByText } = render(<RecipeSteps recipe={recipeMockOdd} />);

        expect(getByText('The Recipe')).toBeInTheDocument();
        expect(getByText('Step 1')).toBeInTheDocument();
        expect(getByText('Step 2')).toBeInTheDocument();
        expect(getAllByText('Test description')).toHaveLength(2);
    });
});
