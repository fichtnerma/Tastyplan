import { SessionProvider } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { WeekplanEntry } from 'src/types/types';
import Weekplan from '../Weekplan';
fetchMock.enableMocks();

describe('Weekplan', () => {
    const mockDay: WeekplanEntry = {
        id: '1',
        date: '2022-12-31',
        lunch: undefined,
        dinner: undefined,
    };
    const mockHasLunch = true;
    const mockHasDinner = true;
    const mockUpdateWeekplan = jest.fn();
    it('should not have basic accessibility issues', async () => {
        const { container } = render(
            <SessionProvider>
                <Weekplan
                    day={mockDay}
                    hasLunch={mockHasLunch}
                    hasDinner={mockHasDinner}
                    updateWeekplan={mockUpdateWeekplan}
                />
                ,
            </SessionProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
