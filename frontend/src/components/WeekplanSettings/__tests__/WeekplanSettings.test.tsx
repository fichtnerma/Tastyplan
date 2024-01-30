import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import WeekplanSettings from '../WeekplanSettings';
type OnChoiceFunction = (preferences: {
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
}) => void;

type WeekplanSettingsProps = {
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
    onChoice: OnChoiceFunction;
};

describe('WeekplanSettings', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockProps: WeekplanSettingsProps = {
        days: ['tuesday', 'wednesday'],
        wantsLunch: false,
        wantsDinner: true,
        servings: 3,
        onChoice: jest.fn(),
    };

    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<WeekplanSettings {...mockProps} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders without crashing', () => {
        const { container } = render(<WeekplanSettings {...mockProps} />);
        expect(container).toBeTruthy();
    });

    it('handles day selection', () => {
        const { getByLabelText } = render(<WeekplanSettings {...mockProps} />);

        fireEvent.click(getByLabelText('Monday')); // select Monday
        expect(mockProps.onChoice).toHaveBeenCalledWith({
            days: ['tuesday', 'wednesday', 'monday'],
            wantsLunch: false,
            wantsDinner: true,
            servings: 3,
        });
    });

    it('handles day deselection', () => {
        const { getByLabelText } = render(<WeekplanSettings {...mockProps} />);

        fireEvent.click(getByLabelText('Tuesday')); // deselect tuesday
        expect(mockProps.onChoice).toHaveBeenCalledWith({
            days: ['wednesday'],
            wantsLunch: false,
            wantsDinner: true,
            servings: 3,
        });
    });

    it('handles lunch selection', () => {
        const { getByLabelText } = render(<WeekplanSettings {...mockProps} />);

        fireEvent.click(getByLabelText('Lunch')); // select Lunch
        expect(mockProps.onChoice).toHaveBeenCalledWith({
            days: ['tuesday', 'wednesday'],
            wantsLunch: true,
            wantsDinner: true,
            servings: 3,
        });
    });

    it('handles lunch unselection', () => {
        const mock_Props: WeekplanSettingsProps = {
            days: ['tuesday', 'wednesday'],
            wantsLunch: true,
            wantsDinner: false,
            servings: 3,
            onChoice: jest.fn(),
        };

        const { getByLabelText } = render(<WeekplanSettings {...mock_Props} />);

        fireEvent.click(getByLabelText('Lunch')); // unselect Lunch
        expect(mock_Props.onChoice).toHaveBeenCalledWith({
            days: ['tuesday', 'wednesday'],
            wantsLunch: false,
            wantsDinner: false,
            servings: 3,
        });
    });

    it('handles dinner unselection', () => {
        const { getByLabelText } = render(<WeekplanSettings {...mockProps} />);

        fireEvent.click(getByLabelText('Dinner')); // unselect Dinner
        expect(mockProps.onChoice).toHaveBeenCalledWith({
            days: ['tuesday', 'wednesday'],
            wantsLunch: false,
            wantsDinner: false,
            servings: 3,
        });
    });

    it('handles dinner selection', () => {
        const mock_Props: WeekplanSettingsProps = {
            days: ['tuesday', 'wednesday'],
            wantsLunch: true,
            wantsDinner: false,
            servings: 3,
            onChoice: jest.fn(),
        };

        const { getByLabelText } = render(<WeekplanSettings {...mock_Props} />);

        fireEvent.click(getByLabelText('Dinner')); // select Dinner
        expect(mock_Props.onChoice).toHaveBeenCalledWith({
            days: ['tuesday', 'wednesday'],
            wantsLunch: true,
            wantsDinner: true,
            servings: 3,
        });
    });

    it('handles portion decrease', () => {
        const { container } = render(<WeekplanSettings {...mockProps} />);
        const decreaseButton = container.querySelector('[data-cy="decrease-serving-btn"]');
        if (decreaseButton) {
            fireEvent.click(decreaseButton); // Decrease portion
            expect(mockProps.onChoice).toHaveBeenCalledWith({
                days: ['tuesday', 'wednesday'],
                wantsLunch: false,
                wantsDinner: true,
                servings: 2,
            });
        }
    });

    it('handles portion increase', () => {
        const { container } = render(<WeekplanSettings {...mockProps} />);
        const increaseButton = container.querySelector('[data-cy="increase-serving-btn"]');
        if (increaseButton) {
            fireEvent.click(increaseButton);
            expect(mockProps.onChoice).toHaveBeenCalledWith({
                days: ['tuesday', 'wednesday'],
                wantsLunch: false,
                wantsDinner: true,
                servings: 4,
            });
        }
    });

    it('does nothing when there is no clicked day for day selection', () => {
        const { getByLabelText } = render(<WeekplanSettings {...mockProps} />);

        // Use a label that is not expected to exist in your component
        const invalidLabel = 'NonExistingDay';

        // Use a try-catch block to catch the error
        try {
            fireEvent.click(getByLabelText(invalidLabel));
            // Fail the test if no error is thrown
            fail('Expected an error to be thrown');
        } catch (error) {
            // Expect the error to be thrown
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain(`Unable to find a label with the text of: ${invalidLabel}`);
            expect(mockProps.onChoice).not.toHaveBeenCalled();
        }
    });
});
