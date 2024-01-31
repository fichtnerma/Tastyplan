import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import UserSettings from '../UserSettings';

describe('WeekplanSettings', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<UserSettings />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText } = render(<UserSettings />);

        expect(getByText('User Settings')).toBeInTheDocument();
    });
});
