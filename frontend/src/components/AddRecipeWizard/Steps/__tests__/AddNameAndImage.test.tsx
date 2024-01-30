import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import AddNameAndImage from '../AddNameAndImage';

const fnMock = jest.fn();
const base64Dummy =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII';
const props = {
    currentName: 'test recipe',
    currentImage: undefined,
    onNameChange: fnMock,
    onUploadedImgChange: fnMock,
};

describe('Text Input', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render its template', () => {
        render(
            <AddNameAndImage
                currentName={props.currentName}
                currentImage={props.currentImage}
                onNameChange={props.onNameChange}
                onUploadedImgChange={props.onUploadedImgChange}
            />,
        );

        //component template
        expect(screen.getByTestId('imgDragDrop-fieldset')).toBeInTheDocument();
        expect(screen.getByText('Add name and image')).toBeInTheDocument();
        const inputWrapper = screen.getByTestId('input-wrapper');
        expect(inputWrapper).toHaveClass('p-2', 'pt-0', 'pb-8');
        const label = screen.getByText('Add an Image (optional)');
        expect(label).toHaveAttribute('for', 'uploadImg');

        //text input child
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        //img drag and drop child
        expect(screen.getByTestId('imgDragAndDrop-wrapper')).toBeInTheDocument();
    });
    it('should not render drag and drop box if img is select', () => {
        const changedProps = { ...props, currentImage: base64Dummy };
        render(
            <AddNameAndImage
                currentName={changedProps.currentName}
                currentImage={changedProps.currentImage}
                onNameChange={changedProps.onNameChange}
                onUploadedImgChange={changedProps.onUploadedImgChange}
            />,
        );
        expect(screen.queryByText('Add an Image (optional)')).toBeNull();
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <AddNameAndImage
                currentName={props.currentName}
                currentImage={props.currentImage}
                onNameChange={props.onNameChange}
                onUploadedImgChange={props.onUploadedImgChange}
            />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
