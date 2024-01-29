import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import DialogModel from '../DialogModal';

describe('DialogModel Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it.skip('should do nothing if ref does not exist', () => {
        const mockChildMethod = jest.fn();
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: mockChildMethod });
        expect(useRefSpy).toHaveBeenCalledWith(mockChildMethod);
    });
    it.skip('should not have basic accessibility issues', async () => {
        const fnMock = jest.fn();
        const { container } = render(
            <DialogModel isOpened={false} onClose={fnMock}>
                <p>hello world</p>
            </DialogModel>,
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
