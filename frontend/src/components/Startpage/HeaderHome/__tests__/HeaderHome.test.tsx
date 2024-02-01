import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import HeaderHome from '../HeaderHome';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        return <img {...props} />;
    },
}));
describe('HeaderHome', () => {
    it('should not have basic accessibility issues', async () => {
        const { container } = render(<HeaderHome />);

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders the component', () => {
        const { getByText, getByAltText } = render(<HeaderHome />);

        // Check if the logo is rendered
        const logo = getByAltText('logo');
        expect(logo).toBeInTheDocument();

        // Check if the registration and login links are rendered
        const registrationLink = getByText('Registration');
        const loginLink = getByText('Login');
        expect(registrationLink).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();

        // Check if the heading and subheadings are rendered
        const heading1 = getByText('Personalized Meal');
        const heading2 = getByText('Planning');
        const subheading1 = getByText("- Tastyplan's AI will delight");
        const subheading2 = getByText('your taste buds');
        expect(heading1).toBeInTheDocument();
        expect(heading2).toBeInTheDocument();
        expect(subheading1).toBeInTheDocument();
        expect(subheading2).toBeInTheDocument();

        // Check if the "Create Weekplan" button is rendered
        const createWeekplanBtn = getByText('Create Weekplan');
        expect(createWeekplanBtn).toBeInTheDocument();
    });
});
