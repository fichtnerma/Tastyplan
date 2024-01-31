import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckboxGroup from '../CheckboxGroup';

const mockOnCheckboxSelect = jest.fn();

const checkboxes = [
    { id: '1', label: 'Checkbox 1', value: 'checkbox1', checked: false },
    { id: '2', label: 'Checkbox 2', value: 'checkbox2', checked: true },
];

describe('CheckboxGroup renders correctly and handles checkbox changes', () => {
    it('renders correctly', () => {
        const { getByLabelText } = render(
            <CheckboxGroup
                checkboxes={checkboxes}
                groupName="testGroup"
                onCheckboxSelect={mockOnCheckboxSelect}
                disabled={false}
            />,
        );

        checkboxes.forEach((checkbox) => {
            const checkboxElement = getByLabelText(checkbox.label);
            expect(checkboxElement).toBeInTheDocument();
        });
    });

    it('handles checkbox changes correctly', () => {
        const { getByLabelText } = render(
            <CheckboxGroup
                checkboxes={checkboxes}
                groupName="testGroup"
                onCheckboxSelect={mockOnCheckboxSelect}
                disabled={false}
            />,
        );
        const checkbox1 = getByLabelText('Checkbox 1');
        fireEvent.click(checkbox1);
        expect(mockOnCheckboxSelect).toHaveBeenCalledWith('1', 'checkbox1', true);

        const checkbox2 = getByLabelText('Checkbox 2');
        fireEvent.click(checkbox2);
        expect(mockOnCheckboxSelect).toHaveBeenCalledWith('2', 'checkbox2', false);
    });
});
