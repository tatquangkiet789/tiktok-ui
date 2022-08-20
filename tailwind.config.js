/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgba(254, 44, 85, 1.0)',
                hoverPrimary: '#e4274c',
                gray006: 'rgba(22, 24, 35, 0.06)',
                gray03: 'rgba(22, 24, 35, 0.3)',
                gray06: 'rgba(22, 24, 35, 0.6)',
                gray034: 'rgba(22, 24, 35, 0.34)',
                gray003: 'rgba(22, 24, 35, 0.03)',
                gray075: 'rgba(22, 24, 35, 0.75)',
                gray012: 'rgba(22, 24, 35, 0.12)',
                gray01: 'rgba(22, 24, 35, 0.1)',
                gray05: 'rgba(22, 24, 35, 0.5)',
                white1: 'rgba(255, 255, 255, 1)',
                gray241_241_242_1: 'rgba(241, 241, 242, 1)',
                hoverPink: 'rgba(254, 44, 85, 0.06)',
            },
        },
    },
    plugins: [],
};
