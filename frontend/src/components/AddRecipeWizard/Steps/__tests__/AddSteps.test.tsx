import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent, screen } from '@testing-library/react';
import AddSteps, { CustomStep } from '../AddSteps';

// Mock the DialogModal component
jest.mock('../../../../components/DialogModal/DialogModal', () => ({
    __esModule: true,
    default: jest.fn(({ isOpened, children }) => (isOpened ? <div data-testid="dialog-modal">{children}</div> : null)),
}));

const initialSteps: CustomStep[] = [
    { id: '1', description: 'First Step' },
    { id: '2', description: 'Second Step' },
];

describe('AddSteps Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddSteps component', () => {
        render(<AddSteps currentSteps={initialSteps} onAddSteps={jest.fn()} />);
        expect(screen.getByText('Add the Steps')).toBeInTheDocument();
    });

    test('renders existing steps', () => {
        render(<AddSteps currentSteps={initialSteps} onAddSteps={jest.fn()} />);
        initialSteps.forEach((step) => {
            expect(screen.getAllByText(`Step ${step.id}`)[0]).toBeInTheDocument();
        });
    });

    test.skip('adds a new step', () => {
        const onAddStepsMock = jest.fn();
        render(<AddSteps currentSteps={initialSteps} onAddSteps={onAddStepsMock} />);

        fireEvent.click(screen.getAllByText('Add new step')[0]);

        expect(onAddStepsMock).toHaveBeenCalledWith([{ description: 'New Step' }]);

        expect(screen.getAllByText('New Step')[0]).toBeInTheDocument();
    });

    test('deletes a step', () => {
        const onAddStepsMock = jest.fn();
        render(<AddSteps currentSteps={initialSteps} onAddSteps={onAddStepsMock} />);

        fireEvent.click(screen.getAllByTestId('delete-btn')[0]);
        fireEvent.click(screen.getAllByTestId('delete-btn')[0]);
        expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    });

    test('should not have basic accessibility issues', async () => {
        const { container } = render(<AddSteps currentSteps={initialSteps} onAddSteps={jest.fn()} />);
        const results = await axe(container);

        expect(results.violations).toHaveLength(0);
    });
});
