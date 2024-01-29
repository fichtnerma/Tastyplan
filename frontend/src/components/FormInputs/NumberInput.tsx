import { useState } from 'react';

interface NumberInputProps {
    label?: string;
    placeholder?: string;
    id?: string;
    value: number;
    min?: number;
    max?: number;
    required?: boolean;
    onChange?: (value: number) => void;
}
const NumberInput = ({ label, placeholder, id, value, min = 1, max, required, onChange }: NumberInputProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value.toString().startsWith('0')) {
            setErrorMessage('Choose a valid number');
            return;
        }

        const parsedValue = +value;

        if (isNaN(parsedValue)) {
            setErrorMessage('Choose a valid number');
            return;
        }

        if (onChange) {
            onChange(parsedValue);
            setErrorMessage(undefined);
        }
    };

    const handleBlur = () => {
        if (!value) {
            setErrorMessage('Enter a value');
        }
    };

    return (
        <div>
            <div className="flex flex-col">
                {label && (
                    <label htmlFor={id}>
                        {label}
                        {required ? ' *' : ''}
                    </label>
                )}
                <input
                    className={`h-[45px] pl-4 pr-4 border-solid border-[3px] rounded-[15px] bg-white-custom border-green-custom2`}
                    style={{ borderColor: errorMessage && '#d54444' }}
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
            <span className={`${errorMessage} ? '' : 'hidden'} text-red-custom text-[0.75rem] mt-[0.25rem]`}>
                {errorMessage}
            </span>
        </div>
    );
};

export default NumberInput;
