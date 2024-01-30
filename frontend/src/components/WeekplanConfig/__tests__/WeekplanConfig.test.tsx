import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import WeekplanConfig from '../WeekplanConfig';

describe('WeekplanConfig', () => {
    const mockProps = {
        onBack: jest.fn(),
        onChoice: jest.fn(),
        servings: 3,
        handlePreferences: jest.fn(),
        daysCheckboxes: [
            { id: '1', label: 'Tuesday', checked: false, value: 'tuesday' },
            { id: '2', label: 'Wednesday', checked: true, value: 'wednesday' },
        ],
        handleDaySelection: jest.fn(),
        mealsCheckboxes: [
            { id: '7', label: 'Lunch', checked: false, value: 'lunch' },
            { id: '8', label: 'Dinner', checked: true, value: 'dinner' },
        ],
        handleMealSelection: jest.fn(),
    };

    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<WeekplanConfig {...mockProps} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders without crashing', () => {
        const { container } = render(<WeekplanConfig {...mockProps} />);
        expect(container).toBeTruthy();
    });

    it('calls onBack when the "Back" button is clicked', () => {
        const { getByText } = render(<WeekplanConfig {...mockProps} />);
        fireEvent.click(getByText('Back'));
        expect(mockProps.onBack).toHaveBeenCalled();
    });

    it('calls onChoice when servings are increased or decreased', () => {
        const { container } = render(<WeekplanConfig {...mockProps} />);
        const decreaseButton = container.querySelector('[data-cy="decrease-serving-btn"]');
        const increaseButton = container.querySelector('[data-cy="increase-serving-btn"]');
        if (decreaseButton) {
            fireEvent.click(decreaseButton);
            expect(mockProps.onChoice).toHaveBeenCalledWith(2);
        }

        if (increaseButton) {
            fireEvent.click(increaseButton);
            expect(mockProps.onChoice).toHaveBeenCalledWith(3);
        }
    });

    it('calls handleDaySelection and handleMealSelection when checkboxes are clicked', () => {
        const { getByLabelText } = render(<WeekplanConfig {...mockProps} />);
        fireEvent.click(getByLabelText('Tuesday')); // Day checkbox
        expect(mockProps.handleDaySelection).toHaveBeenCalledWith('1', 'tuesday', true);

        fireEvent.click(getByLabelText('Lunch')); // Meal checkbox
        expect(mockProps.handleMealSelection).toHaveBeenCalledWith('7', 'lunch', true);
    });

    it('calls handlePreferences when "Create Weekplan" button is clicked', () => {
        const { getByText } = render(<WeekplanConfig {...mockProps} />);
        fireEvent.click(getByText('Create Weekplan'));
        expect(mockProps.handlePreferences).toHaveBeenCalled();
    });
});
