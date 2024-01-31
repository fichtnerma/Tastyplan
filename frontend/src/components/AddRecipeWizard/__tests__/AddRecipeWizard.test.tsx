// AddRecipeWizard.test.js

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddRecipeWizard from '../AddRecipeWizard';

describe('AddRecipeWizard', () => {
    it('renders the component', () => {
        const onNewRecipeMock = jest.fn();
        const onInputisInvalidMock = jest.fn();
        render(<AddRecipeWizard stepNr={1} onNewRecipe={onNewRecipeMock} onInputisInvalid={onInputisInvalidMock} />);

        expect(screen.getByText(/Add Name and Image/i)).toBeInTheDocument();
    });

    it('handles name change correctly', () => {
        const onNewRecipeMock = jest.fn();
        const onInputisInvalidMock = jest.fn();

        render(<AddRecipeWizard stepNr={1} onNewRecipe={onNewRecipeMock} onInputisInvalid={onInputisInvalidMock} />);

        const nameInput = screen.getByTestId('txt-input');
        fireEvent.change(nameInput, { target: { value: 'New Recipe Name' } });

        expect(onNewRecipeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'New Recipe Name',
            }),
        );
    });

    it('handles total time change correctly', () => {
        const onNewRecipeMock = jest.fn();
        const onInputisInvalidMock = jest.fn();

        render(
            <SessionProvider session={null}>
                <AddRecipeWizard stepNr={2} onNewRecipe={onNewRecipeMock} onInputisInvalid={onInputisInvalidMock} />
            </SessionProvider>,
        );

        const totalTimeInput = screen.getByLabelText('How long will it take you in minutes?');
        fireEvent.change(totalTimeInput, { target: { value: 20 } });

        expect(onNewRecipeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                totalTime: 20,
            }),
        );
    });
});
