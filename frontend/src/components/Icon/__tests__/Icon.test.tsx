// icon.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../Icon';

const defaultProps = {
    icon: 'someIcon',
};

test('renders Icon component with default props', () => {
    const { getByTestId } = render(<Icon {...defaultProps} testId="default-icon" />);

    const iconElement = getByTestId('default-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('width', '24');
    expect(iconElement).toHaveAttribute('height', '24');

    // Add more assertions if needed
});

test('renders Icon component with custom props', () => {
    const customProps = {
        icon: 'customIcon',
        size: 32,
        color: 'blue',
        classNames: 'custom-class',
        testId: 'custom-icon',
    };

    const { getByTestId } = render(<Icon {...customProps} />);

    const iconElement = getByTestId('custom-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('width', '32');
    expect(iconElement).toHaveAttribute('height', '32');
    expect(iconElement).toHaveAttribute('color', 'blue');
    expect(iconElement).toHaveAttribute('class', 'custom-class');
});
