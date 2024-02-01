import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<Modal />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders children inside the modal', () => {
        const { getByText } = render(
            <Modal>
                <div>Modal Content</div>
            </Modal>,
        );

        const modalContent = getByText('Modal Content');
        expect(modalContent).toBeInTheDocument();
    });
});
