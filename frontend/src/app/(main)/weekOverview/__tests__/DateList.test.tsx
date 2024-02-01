import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { WeekplanEntry } from 'src/types/types';
import DateList from '../DateList';

describe('DateList', () => {
    const mockDay: WeekplanEntry = {
        id: '1',
        date: '2022-12-31',
        lunch: undefined,
        dinner: undefined,
    };
    const mockIsToday = true;
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<DateList day={mockDay} isToday={mockIsToday} />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
    it('renders the day name and date', () => {
        const { getByText } = render(<DateList day={mockDay} isToday={false} />);

        const dayName = getByText(/Saturday/i);
        const date = getByText(/31.12.22/i);

        expect(dayName).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });
});
