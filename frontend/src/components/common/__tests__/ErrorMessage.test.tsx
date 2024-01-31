import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
    it('renders children correctly', () => {
        const errorMessageText = 'This is an error message';
        render(<ErrorMessage>{errorMessageText}</ErrorMessage>);
        expect(screen.getByText(errorMessageText)).toBeInTheDocument();
    });

    it('renders the icon', () => {
        render(<ErrorMessage>Error</ErrorMessage>);
        const icon = screen.getByTestId('error-icon');
        expect(icon).toBeInTheDocument();
    });
});
