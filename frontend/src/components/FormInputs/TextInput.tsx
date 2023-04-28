import React, { useState } from 'react';
import { isRequiredValidator } from '@helpers/validations';

interface TextInputProps {
    label: string;
    type?: string;
    value: string;
    required?: boolean;
    validate?: (value: string) => string | undefined;
    decoration?: React.ReactNode;
    decorationPosition?: 'start' | 'end';
    onChange?: (value: string) => void;
}

export default function TextInput({
    label,
    type = 'text',
    validate,
    decoration,
    decorationPosition = 'start',
    onChange,
    value,
    required,
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

    return (
        <div>
            <div className={`${errorMessage ? 'error' : ''} w-full text-input-wrapper relative`}>
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
                    value={value}
                    onBlur={handleBlur}
                    onChange={handleTextChange}
                />
            </div>
            <span className={`${errorMessage ? '' : 'hidden'} errorMessage`}>{errorMessage}</span>
        </div>
    );
}
