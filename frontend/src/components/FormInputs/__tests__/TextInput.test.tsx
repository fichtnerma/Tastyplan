import { axe } from 'jest-axe';
import { fireEvent, render, screen } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnFocus = jest.fn();

    const renderTextInput = (props = {}, textValue = 'Long Test Text For Text Input') => {
        const defaultProps = {
            label: 'Test Label',
            onChange: mockOnChange,
            onBlur: mockOnBlur,
            onFocus: mockOnFocus,
            ...props,
        };

        return render(<TextInput {...defaultProps} value={textValue} />);
    };

    it('renders with label and placeholder', () => {
        renderTextInput({ placeholder: 'Test Placeholder' });

        expect(screen.getByTestId('txt-input-label')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        renderTextInput();

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Value' } });

        expect(mockOnChange).toHaveBeenCalledWith('New Value');
    });

    it.skip('calls onBlur and performs validation when input is blurred', () => {
        const mockValidate = jest.fn(() => 'Validation Error');
        renderTextInput({ value: 'Initial Value', validate: mockValidate });

        fireEvent.blur(screen.getByRole('textbox'));

        expect(mockOnBlur).toHaveBeenCalled();
        expect(mockValidate).toHaveBeenCalledWith('Initial Value');
        expect(screen.getByText('Validation Error')).toBeInTheDocument();
    });

    it.skip('displays error message when there is a validation error', () => {
        renderTextInput({ hasError: true, errorMessage: 'Test Error Message' }, undefined);

        fireEvent.blur(screen.getByRole('textbox'));

        expect(screen.getByText('Test Error Message')).toBeInTheDocument();
    });

    it('displays required indicator and calls onBlur for required field', () => {
        renderTextInput({ required: true });

        expect(screen.getByText('Test Label *')).toBeInTheDocument();

        fireEvent.blur(screen.getByRole('textbox'));

        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('renders with decoration at the start', () => {
        renderTextInput({ decoration: <span>Decoration</span>, decorationPosition: 'start' });

        expect(screen.getByText('Decoration')).toBeInTheDocument();
    });

    it('renders with decoration at the end', () => {
        renderTextInput({ decoration: <span>Decoration</span>, decorationPosition: 'end' });

        expect(screen.getByText('Decoration')).toBeInTheDocument();
    });

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<TextInput id="name" label="Name" value="test" />);
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
