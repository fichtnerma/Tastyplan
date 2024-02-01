import { renderHook } from '@testing-library/react';
import useUnsavedChangesWarning from '../useUnsavedChangesWarning';

describe('useUnsavedChangesWarning', () => {
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it('adds beforeunload event listener when condition is true', () => {
        renderHook(() => useUnsavedChangesWarning(true));
        expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });

    it.skip('removes beforeunload event listener when condition is false', () => {
        renderHook(() => useUnsavedChangesWarning(true));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });
});
