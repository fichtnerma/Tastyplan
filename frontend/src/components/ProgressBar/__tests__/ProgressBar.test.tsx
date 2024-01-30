import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import ProgressBar from '../ProgressBar';
describe('ProgressBar', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should not have basic accessibility issues', async () => {
        const childFnMock = jest.fn();
        const { container } = render(
            <ProgressBar
                onClick={childFnMock}
                stepNames={['first step', 'second step', 'third step']}
                activeStep={1}
                stepIsDone={false}
            />,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
