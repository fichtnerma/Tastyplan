import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import ImageMagnifier from '../ImageMagnifier';

describe('Collections', () => {
    const props = {
        src: '/test-image.jpg',
        width: '200px',
        height: 200,
    };

    it('should not have basic accessibility issues', async () => {
        const { container } = render(<ImageMagnifier {...props} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByAltText } = render(<ImageMagnifier {...props} />);

        expect(getByAltText('img')).toBeInTheDocument();
    });

    it('displays magnifier on mouse enter and hides on mouse leave', () => {
        const { getByAltText, getByTestId } = render(<ImageMagnifier {...props} />);

        const image = getByAltText('img');
        const magnifier = getByTestId('magnifier');

        expect(magnifier).toHaveStyle('display: none');

        fireEvent.mouseOver(image);

        expect(magnifier).toHaveStyle('display: block');

        fireEvent.mouseOut(image);

        expect(magnifier).toHaveStyle('display: none');
    });

    it('displays magnifier at the correct position on mouse movement', () => {
        const { getByAltText, getByTestId } = render(<ImageMagnifier {...props} />);

        const image = getByAltText('img');
        const magnifier = getByTestId('magnifier');

        fireEvent.mouseOver(image);
        fireEvent.mouseMove(image, { clientX: 100, clientY: 100 });

        expect(magnifier).toHaveStyle('left: -90px');
        expect(magnifier).toHaveStyle('top: -90px');
    });
});
