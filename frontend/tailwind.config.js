/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: {
                    custom1: '#009245',
                    custom2: '#006837',
                },
                red: {
                    custom: '#d54444',
                },
                gray: {
                    custom1: '#f2f5f4',
                    custom2: '#d6d6d6',
                    custom3: '#707070',
                    custom4: '#3a3a3a',
                },
            },
            height: {
                '90v': '90vh',
            },
        },
    },
    plugins: [],
};
