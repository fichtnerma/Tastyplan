import { render, fireEvent, screen } from '@testing-library/react';
import Keyfacts from '../Keyfacts';

const useFetchWithAuth = jest.fn().mockReturnValue({
    data: [],
    error: undefined,
    refresh: jest.fn(),
});

describe('Keyfacts', () => {
    test.skip('renders Keyfacts and checks cooking time change', () => {
        const handleCookingTime = jest.fn();
        const handleServings = jest.fn();
        const handleFoodLifestyle = jest.fn();
        const handleTags = jest.fn();

        const { getByLabelText } = render(
            <Keyfacts
                currentTotalTime={30}
                currentServings={4}
                currentSelectedFormOfDiet={{ value: 'vegan', label: 'Vegan' }}
                currentTags={[]}
                onTotalTime={handleCookingTime}
                onServings={handleServings}
                onFoodLifestyle={handleFoodLifestyle}
                onTags={handleTags}
                useFetchAuth={useFetchWithAuth}
            />,
        );

        const cookingTimeInput = getByLabelText('How long will it take you in minutes?');
        fireEvent.change(cookingTimeInput, { target: { value: 45 } });

        expect(handleCookingTime).toHaveBeenCalledWith(45);
    });

    test('renders Keyfacts and checks servings change', () => {
        const handleCookingTime = jest.fn();
        const handleServings = jest.fn();
        const handleFoodLifestyle = jest.fn();
        const handleTags = jest.fn();

        render(
            <Keyfacts
                currentTotalTime={30}
                currentServings={4}
                currentSelectedFormOfDiet={{ value: 'vegan', label: 'Vegan' }}
                currentTags={[]}
                onTotalTime={handleCookingTime}
                onServings={handleServings}
                onFoodLifestyle={handleFoodLifestyle}
                onTags={handleTags}
                useFetchAuth={useFetchWithAuth}
            />,
        );

        const decreaseServingsButton = screen.getByTestId('increasePortion');
        fireEvent.click(decreaseServingsButton);

        expect(handleServings).toHaveBeenCalledWith(5);
    });
    test.skip('renders Keyfacts and checks food lifestyle change', async () => {
        const handleCookingTime = jest.fn();
        const handleServings = jest.fn();
        const handleFoodLifestyle = jest.fn();
        const handleTags = jest.fn();

        render(
            <Keyfacts
                currentTotalTime={30}
                currentServings={4}
                currentSelectedFormOfDiet={{ value: 'vegan', label: 'Vegan' }}
                currentTags={[]}
                onTotalTime={handleCookingTime}
                onServings={handleServings}
                onFoodLifestyle={handleFoodLifestyle}
                onTags={handleTags}
                useFetchAuth={useFetchWithAuth}
            />,
        );

        // Assuming the food lifestyle is a dropdown that shows the selected option as text
        //await selectEvent.select(getByLabelText('Food'), ['Strawberry', 'Mango'])
        //const foodLifestyleOption = getByText('Vegan');
        //fireEvent.click(foodLifestyleOption);

        expect(handleFoodLifestyle).toHaveBeenCalledWith('Vegan');
    });

    test.skip('renders Keyfacts and checks tags change', () => {
        const handleCookingTime = jest.fn();
        const handleServings = jest.fn();
        const handleFoodLifestyle = jest.fn();
        const handleTags = jest.fn();

        const { getByText } = render(
            <Keyfacts
                currentTotalTime={30}
                currentServings={4}
                currentSelectedFormOfDiet={{ value: 'vegan', label: 'Vegan' }}
                currentTags={[]}
                onTotalTime={handleCookingTime}
                onServings={handleServings}
                onFoodLifestyle={handleFoodLifestyle}
                onTags={handleTags}
                useFetchAuth={useFetchWithAuth}
            />,
        );

        // Assuming the tags are checkboxes that show the tag as text
        const tagCheckbox = getByText('Gluten Free');
        fireEvent.click(tagCheckbox);

        expect(handleTags).toHaveBeenCalledWith('Gluten Free');
    });
});

// Similar tests can be written for food lifestyle and tags
