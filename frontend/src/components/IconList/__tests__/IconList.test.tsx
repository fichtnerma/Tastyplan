// iconList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import IconList from '../IconList';

const icons = [
    { id: 1, src: 'icon1.svg', text: 'Icon 1' },
    { id: 2, src: 'icon2.svg', text: 'Icon 2' },
];

test('renders IconList component with icons', () => {
    render(<IconList icons={icons} />);

    expect(screen.getByTestId(`icon-desc-${icons[0].id}`)).toHaveTextContent(icons[0].text);
    expect(screen.getByTestId(`icon-desc-${icons[1].id}`)).toHaveTextContent(icons[1].text);
});

// Add more test cases as needed
