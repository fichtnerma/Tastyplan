/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: {
                    custom1: '#d6e5e3',
                    custom2: '#007370',
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
