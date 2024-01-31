import { fireEvent, render } from '@testing-library/react';
import ReturnButton from '../ReturnButton';
import { AppRouterContextProviderMock } from '../__mocks__/app-router-context-provider-mock';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
const backMock = jest.fn();

describe('ReturnButton Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders ReturnButton component', () => {
        const { getByLabelText } = render(
            <AppRouterContextProviderMock router={{ back: backMock }}>
                <ReturnButton />
            </AppRouterContextProviderMock>,
        );

        const backButton = getByLabelText('go back');
        expect(backButton).toBeInTheDocument();
    });

    test('calls router.back() on button click', () => {
        const backMock = jest.fn();

        const { getByLabelText } = render(
            <AppRouterContextProviderMock router={{ back: backMock }}>
                <ReturnButton />
            </AppRouterContextProviderMock>,
        );

        const backButton = getByLabelText('go back');

        fireEvent.click(backButton);

        expect(backMock).toHaveBeenCalled();
    });
});
