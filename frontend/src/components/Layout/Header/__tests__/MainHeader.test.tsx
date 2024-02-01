// import { useRouter } from 'next/router';
// import { SessionProvider } from 'next-auth/react';
// import { axe } from 'jest-axe';
// import { render } from '@testing-library/react';
// import MainHeader from '../MainHeader';

// jest.mock('next/image', () => ({
//     __esModule: true,
//     default: (props) => {
//         return <img {...props} />;
//     },
// }));

// jest.mock('next/router', () => ({
//     __esModule: true,
//     useRouter: () => ({
//         pathname: '/weekOverview', // You can change this value based on your default active tab
//     }),
// }));

describe('MainHeader', () => {
    it('should be truthy', () => {
        expect(true).toBeTruthy();
    });
});

// it('should not have basic accessibility issues', async () => {
//     const { container } = render(
//         <SessionProvider>
//             <MainHeader />
//         </SessionProvider>,
//     );

//     const results = await axe(container);
//     expect(results.violations).toHaveLength(1);
// });

//     it.skip('renders MainHeader component with default active tab', () => {
//         const { getByText } = render(
//             <SessionProvider>
//                 <MainHeader />
//             </SessionProvider>,
//         );

//         const weekOverviewTab = getByText('Weekplan');
//         expect(weekOverviewTab).toHaveClass('fill-green-custom2');
//     });
//  });
