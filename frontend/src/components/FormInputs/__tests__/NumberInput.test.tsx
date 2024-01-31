import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberInput from '../NumberInput';

describe('NumberInput', () => {
    it('renders without crashing', () => {
        const { container } = render(<NumberInput value={0} />);
        expect(container).toBeInTheDocument();
    });

    it('renders label correctly', () => {
        const { getByTestId } = render(<NumberInput label="Test Label" value={0} />);
        const label = getByTestId('number-input-label');
        expect(label).toBeInTheDocument();
    });

    it('handles number change correctly', () => {
        const handleChange = jest.fn();
        const { getByRole } = render(<NumberInput value={0} onChange={handleChange} />);
        const input = getByRole('spinbutton');

        fireEvent.change(input, { target: { value: '42' } });

        expect(handleChange).toHaveBeenCalledWith(42);
    });

    it('displays error message for invalid number', () => {
        const { getByRole, getByTestId } = render(<NumberInput value={0} />);
        const input = getByRole('spinbutton');

        fireEvent.change(input, { target: { value: 'invalid' } });

        const errorMessage = getByTestId('number-input-error-msg');
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays error message onBlur if value is empty and required', () => {
        const { getByRole, getByText } = render(<NumberInput value={0} required />);
        const input = getByRole('spinbutton');

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.blur(input);

        const errorMessage = getByText('Enter a value');
        expect(errorMessage).toBeInTheDocument();
    });

    it.skip('does not display error message onBlur if value is empty but not required', () => {
        const { getByRole, queryByText } = render(<NumberInput value={0} />);
        const input = getByRole('spinbutton');

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.blur(input);

        const errorMessage = queryByText('Enter a value');
        expect(errorMessage).toBeNull();
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<NumberInput value={1} />);
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
