import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { APISearchResponse } from 'src/types/types';
import PreferencesSettings from '../PreferencesSettings';

type OnChoiceFunction = (preferences: {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
}) => void;

type WeekplanSettingsProps = {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    onChoice: OnChoiceFunction;
};

describe('WeekplanSettings', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockProps: WeekplanSettingsProps = {
        formOfDiet: 'vegan',
        allergens: ['egg', 'fish'],
        foodDislikes: [{ id: 1, name: 'paprika' }],
        onChoice: jest.fn(),
    };

    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<PreferencesSettings {...mockProps} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders PreferencesSettings component', () => {
        const { getByText } = render(<PreferencesSettings {...mockProps} />);

        expect(getByText('Your Food Lifestyle')).toBeInTheDocument();
        expect(getByText('Your Intolerances')).toBeInTheDocument();
        expect(getByText('Your Food Dislikes')).toBeInTheDocument();
    });

    it('clicks on diet preferences', () => {
        const { container, getByText } = render(<PreferencesSettings {...mockProps} />);
        const click = container.querySelector('[data-testid="vegetarian"]');
        if (click) {
            fireEvent.click(click);
            expect(getByText('You dont eat any kind of animal products')).toBeInTheDocument();
            expect(mockProps.onChoice).toHaveBeenCalledWith(expect.objectContaining({ formOfDiet: 'vegetarian' }));
        } else null;
    });

    it('clicks on allergens', () => {
        const { container, getByText } = render(<PreferencesSettings {...mockProps} />);
        const click = container.querySelector('[data-testid="egg"]');
        if (click) {
            fireEvent.click(click);
            expect(getByText('You are allergic to egg')).toBeInTheDocument();
            expect(mockProps.onChoice).toHaveBeenCalledWith(expect.objectContaining({ allergens: ['egg'] }));
        } else null;
    });

    it('clicks on food dislikes', () => {
        const { container, getByText } = render(<PreferencesSettings {...mockProps} />);
        const click = container.querySelector('[data-testid="paprika"]');
        if (click) {
            fireEvent.click(click);
            expect(getByText('You dont like paprika')).toBeInTheDocument();
            expect(mockProps.onChoice).toHaveBeenCalledWith(
                expect.objectContaining({ foodDislikes: [{ id: 1, name: 'paprika' }] }),
            );
        } else null;
    });

    it('clicks on food dislikes and removes it', () => {
        const { container, getByText } = render(<PreferencesSettings {...mockProps} />);
        const click = container.querySelector('[data-testid="paprika"]');
        if (click) {
            fireEvent.click(click);
            expect(getByText("You don't have any dislikes.")).not.toBeInTheDocument();
            expect(mockProps.onChoice).toHaveBeenCalledWith(
                expect.objectContaining({ foodDislikes: [{ id: 1, name: 'paprika' }] }),
            );
        } else null;
        const remove = container.querySelector('[data-testid="remove-paprika"]');
        if (remove) {
            fireEvent.click(remove);
            expect(getByText("You don't have any dislikes.")).toBeInTheDocument();
            expect(mockProps.onChoice).toHaveBeenCalledWith(expect.objectContaining({ foodDislikes: [] }));
        } else null;
    });

    it('clicks on allergens and removes it', () => {
        const mock_Props: WeekplanSettingsProps = {
            formOfDiet: 'vegan',
            allergens: [],
            foodDislikes: [{ id: 1, name: 'paprika' }],
            onChoice: jest.fn(),
        };
        const { container, getByText } = render(<PreferencesSettings {...mock_Props} />);
        const click = container.querySelector('[data-testid="egg"]');
        if (click) {
            fireEvent.click(click);
            expect(getByText("You don't have any intolerances.")).not.toBeInTheDocument();
            expect(mock_Props.onChoice).toHaveBeenCalledWith(expect.objectContaining({ allergens: ['egg'] }));
        } else null;
        const remove = container.querySelector('[data-testid="remove-egg"]');
        if (remove) {
            fireEvent.click(remove);
            expect(getByText("You don't have any intolerances.")).toBeInTheDocument();
            expect(mock_Props.onChoice).toHaveBeenCalledWith(expect.objectContaining({ allergens: [] }));
        } else null;
    });
});
