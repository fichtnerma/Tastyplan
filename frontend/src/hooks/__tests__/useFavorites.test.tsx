import { renderHook, act } from '@testing-library/react';
import { fetchWithAuth } from '@helpers/utils';
import { useFavoriteStore } from '../useFavorites';

jest.mock('@helpers/utils', () => ({
    fetchWithAuth: jest.fn(),
}));

describe('useFavoriteStore', () => {
    it('fetches favorites successfully', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, name: 'Recipe 1' }],
        });

        const { result, waitForNextUpdate } = renderHook(() => useFavoriteStore());

        await act(async () => {
            await result.current.fetch({} as any);
        });

        await waitForNextUpdate();

        expect(result.current.favorites).toEqual([{ id: 1, name: 'Recipe 1' }]);
    });

    it('adds a recipe to favorites successfully', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        const { result } = renderHook(() => useFavoriteStore());

        act(() => {
            result.current.add({ id: 2, name: 'Recipe 2' }, {} as any);
        });

        expect(result.current.favorites).toEqual([{ id: 2, name: 'Recipe 2' }]);
    });

    it('removes a recipe from favorites successfully', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        const { result } = renderHook(() => useFavoriteStore());

        act(() => {
            result.current.add({ id: 3, name: 'Recipe 3' }, {} as any);
        });

        act(() => {
            result.current.remove(3, {} as any);
        });

        expect(result.current.favorites).toEqual([]);
    });
});
