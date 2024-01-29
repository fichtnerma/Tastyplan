import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import AddNameAndImage from '../AddNameAndImage';

jest.mock('../AddNameAndImage', () => ({
    ...jest.requireActual('./AddNameAndImage'),
    onNameChange: jest.fn(),
    onUploadedImgChange: jest.fn(),
}));

describe('AddNameAndImage component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render AddNameAndImage component correctly', () => {
        render(<AddNameAndImage />);
    });
    //it('should not have basic accessibility issues', async () => {
        //const { container } = render(<AddNameAndImage />);
        //const results = await axe(container);
        //expect(results.violations).toHaveLength(0);
    });
});
