interface NumberInputProps {
    label?: string;
    placeholder?: string;
    id?: string;
    hasError?: boolean;
    value: string;
    required?: boolean;
    validate?: (value: string) => string | undefined;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
const NumberInput = () => {
    return <div>NumberInput</div>;
};

export default NumberInput;
