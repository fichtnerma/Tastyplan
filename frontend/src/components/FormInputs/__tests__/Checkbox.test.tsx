import { axe } from 'jest-axe';
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../Checkbox';

const fnMock = jest.fn();

const customCheckbox = { id: '1', label: '1', value: '1', checked: false };
describe('Checkbox Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render its template', () => {
        const { container, rerender } = render(
            <Checkbox groupName="test" customCheckbox={customCheckbox} handleChange={fnMock} disabled={false} />,
        );
        // check surounding label
        const labelElement = container.querySelector('label');
        expect(labelElement).toBeInTheDocument();
        if (!labelElement) return;
        const labelForValue = labelElement.getAttribute('for');
        expect(labelForValue).toBe('1');

        // check checkbox input and its attributes
        let inputCheckboxEl = screen.getByRole('checkbox');
        expect(inputCheckboxEl).toBeInTheDocument();
        if (!inputCheckboxEl) return;
        expect(inputCheckboxEl.getAttribute('type')).toBe('checkbox');
        expect(inputCheckboxEl.getAttribute('name')).toBe('test');
        expect(inputCheckboxEl.getAttribute('id')).toBe('1');
        expect(inputCheckboxEl.getAttribute('value')).toBe('1');
        expect(inputCheckboxEl.getAttribute('checked')).toBeFalsy();
        expect(inputCheckboxEl.getAttribute('disabled')).toBeFalsy();

        //check label text in span
        const spanLabel = screen.getByText('1');
        expect(spanLabel).toBeInTheDocument();

        //check if checkbox can be disabled
        rerender(<Checkbox groupName="test" customCheckbox={customCheckbox} handleChange={fnMock} disabled={true} />);
        inputCheckboxEl = screen.getByRole('checkbox');
        if (!inputCheckboxEl) return;
        expect(inputCheckboxEl.getAttribute('disabled')).toBe('');
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <Checkbox
                groupName="test"
                customCheckbox={{ id: '1', label: '1', value: '1', checked: false }}
                handleChange={fnMock}
                disabled={false}
            />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
