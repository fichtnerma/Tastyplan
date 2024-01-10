import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import TextInput from '../TextInput';
describe('Text Input', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<TextInput id="name" label="Name" value="test" />);
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
