/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                becon: {
                    bg: '#05020a',
                    primary: '#7c3aed',
                    secondary: '#4c1d95',
                    accent: '#a78bfa',
                    glass: 'rgba(255, 255, 255, 0.05)',
                    glassBorder: 'rgba(255, 255, 255, 0.1)',
                }
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at 50% 50%, #2e1065 0%, #05020a 70%)',
                'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            }
        },
    },
    plugins: [],
}
