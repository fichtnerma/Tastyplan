import { render } from '@testing-library/react';
import ImgDragAndDrop from '../ImgDragAndDrop';
import { useDropzone } from 'react-dropzone';

// Mock the 'react-dropzone' module
jest.mock('react-dropzone');

const mockUseDropzone = useDropzone as jest.MockedFunction<typeof useDropzone>;

test.skip('renders ImgDragAndDrop and checks if all elements are rendered correctly', () => {
  const handleUpload = jest.fn();

  const { getByTestId, getByRole, getByText } = render(<ImgDragAndDrop currentImage="test.jpg" onUploadedImgChange={handleUpload} />);

  expect(getByTestId('imgDragAndDrop-wrapper')).toBeInTheDocument();

  expect(getByRole('button')).toBeInTheDocument();

  expect(getByText('Drop files here ...')).toBeInTheDocument();

  expect(getByText('Drag&Drop or Browse')).toBeInTheDocument();

  // Check if the "Remove img" button is rendered
  expect(getByText('Remove img')).toBeInTheDocument();
});