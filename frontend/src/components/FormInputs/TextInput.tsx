import React, { useState } from 'react';
import { isRequiredValidator } from '@helpers/validations';

interface TextInputProps {
    label?: string;
    placeholder?: string;
    hasError?: boolean;
    type?: string;
    value: string;
    required?: boolean;
    validate?: (value: string) => string | undefined;
    decoration?: React.ReactNode;
    decorationPosition?: 'start' | 'end';
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function TextInput({
    label,
    placeholder,
    type = 'text',
    validate,
    decoration,
    decorationPosition = 'start',
    onChange,
    hasError = false,
    value,
    required,
    onFocus,
    onBlur,
}: TextInputProps) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isAtStart = decoration && decorationPosition == 'start';
    const isAtEnd = decoration && decorationPosition == 'end';

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    console.log(hasError);

    return (
        <div>
            <div className={`${errorMessage || hasError ? 'error' : ''} w-full text-input-wrapper relative`}>
                {decoration ? (
                    <div className={`absolute bottom-2 ${isAtStart ? 'left-2' : 'right-2'}`}>{decoration}</div>
                ) : null}
                <label htmlFor="text-input">
                    {label}
                    {required ? ' *' : ''}
                </label>
                <input
                    className={`border-2 ${isAtStart ? 'pl-9' : 'pl-4'} ${
                        isAtEnd ? 'pr-9' : 'pr-4'
                    } h-10 w-full border-gray-700 rounded-xl`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onBlur={onBlur ? onBlur : handleBlur}
                    onChange={handleTextChange}
                    onFocus={onFocus}
                />
            </div>
            <span className={`${errorMessage ? '' : 'hidden'} errorMessage`}>{errorMessage}</span>
        </div>
    );
}
