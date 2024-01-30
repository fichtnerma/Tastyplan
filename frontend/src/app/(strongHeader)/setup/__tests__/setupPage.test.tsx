import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import SetupPage from '../page';

jest.mock('next-auth/react');

describe('SetupPage', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const { container } = render(<SetupPage />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
