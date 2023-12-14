export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            'poppins': ['"Poppins"','sans-serif'],
            'inter': ['"Inter"','ui-sans-serif'],
        },
        screens: {
            sm: '560px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px',
        },
        colors: {
            gray: {
                100: 'var(--gray-100)',
                200: 'var(--gray-200)',
                300: 'var(--gray-300)',
                400: 'var(--gray-400)',
            },
            blue: {
                100: 'var(--blue-100)',
                200: 'var(--blue-200)',
                300: 'var(--blue-300)',
                DEFAULT: 'var(--blue)',
                400: 'var(--blue-400)',
            },
            black: {
                DEFAULT: 'var(--black)',
                400: 'var(--black-400)',
            },
            white: "#FFFFFF",
            secondary: 'var(--secondary)',
        },
    },
    corePlugins: {
        textOpacity: false,
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        placeholderOpacity: false,
        ringOpacity: false,
    },
    plugins: [],
}