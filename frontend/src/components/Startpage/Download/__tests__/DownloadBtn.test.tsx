import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import DownloadBtn from '../DownloadBtn';

describe('DownloadBtn', () => {
    beforeAll(() => {
        // Mock BeforeInstallPromptEvent for testing
        Object.defineProperty(window, 'BeforeInstallPromptEvent', {
            writable: true,
            value: jest.fn(),
        });
    });
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<DownloadBtn />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText } = render(<DownloadBtn />);

        expect(getByText('Desktop App')).toBeInTheDocument();
    });
});
