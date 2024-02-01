import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Download from '../Download';

describe('Download', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Download />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders component', () => {
        const { getByText, getByRole } = render(<Download />);

        expect(getByText('Download Tastyplan')).toBeInTheDocument();
        expect(getByText('Tastyplan Web')).toBeInTheDocument();
        expect(getByText('Tastyplan Android')).toBeInTheDocument();
        expect(getByText('Tastyplan IOS')).toBeInTheDocument();
        expect(getByText('Progressive Web App')).toBeInTheDocument();
        expect(getByText('Get the Desktop experience on your browser.')).toBeInTheDocument();
        expect(getByText('Download our Android app on Google Play.')).toBeInTheDocument();
        expect(
            getByText(
                'Just like an iOS app but better. Open tastyplan.de on your browser, click the share icon, and choose "Add to Home Screen", tastyplan.de magic is now at your fingertips.',
            ),
        ).toBeInTheDocument();
        expect(getByRole('link', { name: 'Get it on Google Play' })).toHaveAttribute('href', '/');
        expect(getByRole('link', { name: 'Progressive Web App' })).toHaveAttribute(
            'href',
            'https://docs.daily.dev/docs/getting-started/pwa#how-can-i-add-dailydev-to-my-mobile-home-screen-on-ios',
        );
    });
});
