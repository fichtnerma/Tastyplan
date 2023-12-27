import { useState } from 'react';
import { isRequiredValidator } from '@helpers/validations';

interface NumberInputProps {
    label?: string;
    placeholder?: string;
    id?: string;
    hasError?: boolean;
    value: number;
    min?: number;
    max?: number;
    required?: boolean;
    validate?: (value: number) => string | undefined;
    onChange?: (value: number) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
const NumberInput = ({ label, placeholder, id, value, min, max, required, validate, onChange }: NumberInputProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (onChange) {
            onChange(+value);
        }
    };

    const handleBlur = () => {
        if (required) {
            const error = isRequiredValidator(value);
            setErrorMessage(error);
            if (error) {
                return;
            }
        }

        if (validate) {
            setErrorMessage(validate(value));
        }
    };

    return (
        <div>
            <div>
                {label && (
                    <label htmlFor={id}>
                        {label}
                        {required ? ' *' : ''}
                    </label>
                )}
                <input
                    className="h-[50px] p-4 border-solid border-[2px] rounded-[25px] border-green-custom2"
                    type="number"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    min={min}
                    max={max}
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                />
            </div>
            <span className={`${errorMessage} ? '' : 'hidden'} errorMessage`}>{errorMessage}</span>
        </div>
    );
};

export default NumberInput;
