import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LogoLinkProvider, useLogoLinkData } from '../LogoLinkContext';

describe('LogoLinkContext', () => {
    it('renders children with default context values', () => {
        const TestComponent: React.FC = () => {
            const { logoLinkTarget } = useLogoLinkData();
            return <div data-testid="logo-link-target">{logoLinkTarget}</div>;
        };

        const { getByTestId } = render(
            <LogoLinkProvider>
                <TestComponent />
            </LogoLinkProvider>,
        );

        const logoLinkTargetElement = getByTestId('logo-link-target');
        expect(logoLinkTargetElement.textContent).toBe('/');
    });

    it('updates logo link target using setLogoLinkTarget', () => {
        const TestComponent: React.FC = () => {
            const { logoLinkTarget, setLogoLinkTarget } = useLogoLinkData();
            return (
                <div>
                    <div data-testid="logo-link-target">{logoLinkTarget}</div>
                    <button onClick={() => setLogoLinkTarget('/new-target')}>Change Target</button>
                </div>
            );
        };

        const { getByTestId, getByText } = render(
            <LogoLinkProvider>
                <TestComponent />
            </LogoLinkProvider>,
        );

        const logoLinkTargetElement = getByTestId('logo-link-target');
        const changeTargetButton = getByText('Change Target');

        expect(logoLinkTargetElement.textContent).toBe('/');

        fireEvent.click(changeTargetButton);

        expect(logoLinkTargetElement.textContent).toBe('/new-target');
    });
});
