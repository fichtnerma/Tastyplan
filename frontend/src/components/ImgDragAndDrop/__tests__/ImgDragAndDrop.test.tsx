import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import ImgDragAndDrop from '../ImgDragAndDrop';

describe('Text Input', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should not have basic accessibility issues', async () => {
        const onUploadImgChangeHandler = jest.fn();
        const { container } = render(
            <ImgDragAndDrop currentImage={undefined} onUploadedImgChange={onUploadImgChangeHandler} />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
