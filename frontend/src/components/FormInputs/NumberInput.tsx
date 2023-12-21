import { useState } from 'react';
import { isRequiredValidator } from '@helpers/validations';

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
const NumberInput = ({ label, placeholder, id, value, required, validate, onChange }: NumberInputProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (onChange) {
            onChange(value);
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
                <label htmlFor={id}>
                    {label}
                    {required ? ' *' : ''}
                </label>
                <input
                    className="h-[50px] p-4 border-solid border-[2px] rounded-[25px] border-green-custom2"
                    type="number"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleNumberChange}
                    onBlur={handleBlur}
                />
            </div>
            <span className={`${errorMessage} ? '' : 'hidden'} errorMessage`}>{errorMessage}</span>
        </div>
    );
};

export default NumberInput;
