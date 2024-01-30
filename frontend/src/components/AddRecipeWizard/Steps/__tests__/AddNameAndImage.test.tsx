import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import AddNameAndImage from '../AddNameAndImage';

describe('Text Input', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should not have basic accessibility issues', async () => {
        const onNameChangeHandler = jest.fn();
        const onUploadedImgChangeHandler = jest.fn();
        const { container } = render(
            <AddNameAndImage
                currentName="new recipe"
                currentImage={undefined}
                onNameChange={onNameChangeHandler}
                onUploadedImgChange={onUploadedImgChangeHandler}
            />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
