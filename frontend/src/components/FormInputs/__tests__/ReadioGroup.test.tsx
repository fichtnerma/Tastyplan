// RadioGroup.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioGroup from '../RadioGroup';

const radioBtns = [
    { id: '1', label: 'Option 1', value: '1', checked: true },
    { id: '2', label: 'Option 2', value: '2', checked: false },
    { id: '3', label: 'Option 3', value: '3', checked: false },
];

test('renders RadioGroup component with radio buttons', () => {
    const { getByText } = render(<RadioGroup radioBtns={radioBtns} groupName="testGroup" />);

    radioBtns.forEach((btn) => {
        const radioElement = getByText(btn.label);
        expect(radioElement).toBeInTheDocument();
    });
});

test('handles group change correctly', () => {
    const { getByLabelText } = render(<RadioGroup radioBtns={radioBtns} groupName="testGroup" />);

    const option2Radio = getByLabelText('Option 2');
    const option3Radio = getByLabelText('Option 3');

    fireEvent.click(option2Radio);
    expect(option2Radio).toBeChecked();
    expect(option3Radio).not.toBeChecked();
});
