import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Keyfacts from '../Keyfacts';

const useFetchWithAuth = jest.fn().mockReturnValue({
    data: ['test', 'test2', 'test3'],
    error: undefined,
    refresh: jest.fn(),
});

describe('Keyfacts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should not have basic accessibility issues', async () => {
        const functionMock = jest.fn();
        const { container } = render(
            <Keyfacts
                currentTotalTime={1}
                currentServings={1}
                currentSelectedFormOfDiet={{ value: 'vegan', label: 'Vegan' }}
                currentTags={[]}
                onTotalTime={functionMock}
                onServings={functionMock}
                onFoodLifestyle={functionMock}
                onTags={functionMock}
                useFetchAuth={useFetchWithAuth}
            />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
