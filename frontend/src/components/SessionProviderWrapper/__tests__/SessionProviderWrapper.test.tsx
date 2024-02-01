import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import SessionProviderWrapper from '../SessionProviderWrapper';
fetchMock.enableMocks();

describe('SessionProviderWrapper', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <SessionProviderWrapper>
                <div>Test child</div>
            </SessionProviderWrapper>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
