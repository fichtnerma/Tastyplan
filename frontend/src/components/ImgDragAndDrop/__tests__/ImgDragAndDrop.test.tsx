import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImgDragAndDrop from '../ImgDragAndDrop';

jest.mock('next/image', () => {
    const ImgMock: React.FC<{ src: string; alt: string }> = ({ src, alt }) => <img src={src} alt={alt} />;
    ImgMock.displayName = 'Image';
    return ImgMock;
});

test('renders ImgDragAndDrop component', () => {
    const { getByTestId } = render(<ImgDragAndDrop currentImage={undefined} onUploadedImgChange={jest.fn()} />);
    const component = getByTestId('imgDragAndDrop-wrapper');
    expect(component).toBeInTheDocument();
});

test.skip('allows file drop', async () => {
    const onUploadedImgChangeMock = jest.fn();
    const { getByTestId } = render(
        <ImgDragAndDrop currentImage={undefined} onUploadedImgChange={onUploadedImgChangeMock} />,
    );
    const dropzone = getByTestId('imgDragAndDrop-wrapper');

    fireEvent.drop(dropzone, {
        dataTransfer: {
            files: [new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })],
        },
    });

    await waitFor(() => {
        expect(onUploadedImgChangeMock).toHaveBeenCalledWith(expect.any(String));
    });
});

test.skip('removes uploaded image', () => {
    const onUploadedImgChangeMock = jest.fn();
    const { getByText } = render(
        <ImgDragAndDrop currentImage="fakeBase64Image" onUploadedImgChange={onUploadedImgChangeMock} />,
    );
    const removeButton = getByText('Remove img');

    fireEvent.click(removeButton);

    expect(onUploadedImgChangeMock).toHaveBeenCalledWith(null);
});
