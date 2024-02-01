import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

// Mock the handleChange function
const mockHandleChange = jest.fn();

const mockCheckbox = {
    id: 'checkboxId',
    value: 'checkboxValue',
    label: 'Checkbox Label',
    checked: false,
};

const renderCheckbox = (disabled: boolean) => {
    return render(
        <Checkbox
            groupName="testGroup"
            customCheckbox={mockCheckbox}
            handleChange={mockHandleChange}
            disabled={disabled}
        />,
    );
};

describe('Checkbox Component', () => {
    it('renders unchecked checkbox', () => {
        const { getByLabelText } = renderCheckbox(false);
        const checkbox = getByLabelText('Checkbox Label');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it.skip('renders checked checkbox', () => {
        const { getByLabelText } = renderCheckbox(false);
        const checkbox = getByLabelText('Checkbox Label');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('disables the checkbox when disabled prop is true', () => {
        const { getByLabelText } = renderCheckbox(true);
        const checkbox = getByLabelText('Checkbox Label');
        expect(checkbox).toBeDisabled();
    });

    it('calls handleChange function when checkbox is clicked', () => {
        const { getByLabelText } = renderCheckbox(false);
        const checkbox = getByLabelText('Checkbox Label');
        fireEvent.click(checkbox);
        expect(mockHandleChange).toHaveBeenCalledWith(mockCheckbox.id, mockCheckbox.value, !mockCheckbox.checked);
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = renderCheckbox(false);
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
