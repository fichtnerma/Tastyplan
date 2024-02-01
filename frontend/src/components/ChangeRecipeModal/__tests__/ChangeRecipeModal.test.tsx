import { SessionProvider, useSession } from 'next-auth/react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import ChangeRecipeModal from '../ChangeRecipeModal';

const useAuthSession: typeof useSession = jest.fn().mockReturnValue({
    data: ['test', 'test2', 'test3'],
    error: undefined,
    refresh: jest.fn(),
});

describe('ChangeRecipeModal', () => {
    it.skip('should not have basic accessibility issues', async () => {
        const setIsOpened = jest.fn();
        const refresh = jest.fn();
        const open = false;
        const isLunch = false;
        const entryId = 'testEntryId';
        const recipeId = 1;

        const { container } = render(
            <SessionProvider>
                <ChangeRecipeModal
                    open={open}
                    setIsOpened={setIsOpened}
                    entryId={entryId}
                    refresh={refresh}
                    isLunch={isLunch}
                    recipeId={recipeId}
                    useAuthSession={useAuthSession}
                />
            </SessionProvider>,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
