import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import RadioButton from '../Radiobutton';

describe('RadioButton Component', () => {
    const mockHandleChange = jest.fn();

    const radioBtn = {
        id: 'radioBtn1',
        label: 'Option 1',
        value: '1',
        checked: false,
    };

    const groupName = 'options';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const { container } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        expect(container).toMatchSnapshot();
    });

    it('renders radio button input', () => {
        const { getByRole } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const radioInput = getByRole('radio');
        expect(radioInput).toBeInTheDocument();
        expect(radioInput).toHaveAttribute('name', groupName);
        expect(radioInput).toHaveAttribute('id', radioBtn.id);
    });

    it('renders label', () => {
        const { getByLabelText } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const label = getByLabelText(radioBtn.label);
        expect(label).toBeInTheDocument();
    });

    it.skip('handles change', () => {
        const { getByRole } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const radioInput = getByRole('radio');

        fireEvent.change(radioInput, { target: { checked: true } });

        expect(mockHandleChange).toHaveBeenCalledWith(radioBtn.id, true);
    });

    it('receives groupName prop', () => {
        const { getByRole } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const radioInput = getByRole('radio');
        expect(radioInput).toHaveAttribute('name', groupName);
    });

    it.skip('receives radioBtn prop', () => {
        const { getByRole } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const radioInput = getByRole('radio');
        expect(radioInput).toHaveAttribute('id', radioBtn.id);
        expect(radioInput).toHaveAttribute('defaultChecked', radioBtn.checked.toString());

        //const label = screen.getByLabelText(radioBtn.label);
        //expect(label).toBeInTheDocument();
    });

    it('receives handleChange prop', () => {
        const { getByRole } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const radioInput = getByRole('radio');

        fireEvent.click(radioInput);

        expect(mockHandleChange).toHaveBeenCalledWith(radioBtn.id, true);
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <RadioButton groupName={groupName} radioBtn={radioBtn} handleChange={mockHandleChange} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
