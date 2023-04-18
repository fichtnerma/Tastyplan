const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['var(--font-inter)', ...fontFamily.sans],
                bebas: ['var(--font-bebas)', ...fontFamily.sans],
            },
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
                    custom5: '#C5C5C5',
                },
                white: {
                    custom: '#fffffa',
                },
            },
            height: {
                '90v': '90vh',
                '70v': '70vh',
            },
            boxShadow: {
                custom: '0px 2px 15px 3px rgba(0,0,0,0.4)',
            },
        },
    },
    plugins: [],
};
