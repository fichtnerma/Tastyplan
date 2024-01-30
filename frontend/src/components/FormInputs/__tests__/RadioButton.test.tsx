import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Radiobutton from '../Radiobutton';

const fnMock = jest.fn();

const customRadiobutton = { id: '1', label: '2', value: '3', checked: false };
describe('RadioButton Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render its template', () => {
        const { container, rerender } = render(
            <Radiobutton groupName="test" radioBtn={customRadiobutton} handleChange={fnMock} />,
        );
        // check surounding label
        const labelElement = container.querySelector('label');
        expect(labelElement).toBeInTheDocument();
        if (!labelElement) return;
        const labelForValue = labelElement.getAttribute('for');
        expect(labelForValue).toBe('1');

        // check radio input and its attributes
        let radioBtn = screen.getByRole('radio');
        expect(radioBtn).toBeInTheDocument();
        if (!radioBtn) return;
        expect(radioBtn.getAttribute('type')).toBe('radio');
        expect(radioBtn.getAttribute('name')).toBe('test');
        expect(radioBtn.getAttribute('id')).toBe('1');
        expect(radioBtn.getAttribute('checked')).toBeFalsy();
        expect(radioBtn.getAttribute('disabled')).toBeFalsy();

        //check if radio can be disabled
        const checkedRadio = { ...customRadiobutton, checked: true };
        rerender(<Radiobutton groupName="test" radioBtn={checkedRadio} handleChange={fnMock} />);
        radioBtn = screen.getByRole('radio');
        if (!radioBtn) return;
        expect(radioBtn.getAttribute('checked')).toBe('');
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <Radiobutton groupName="test" radioBtn={customRadiobutton} handleChange={fnMock} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
