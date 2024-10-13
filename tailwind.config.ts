import type { Config } from 'tailwindcss';
import tailwindPrimePlugin from 'tailwindcss-primeui';

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts}',
    ],
    plugins: [
        tailwindPrimePlugin,
    ],
    darkMode: [ 'selector', '[class="p-dark"]' ],
    theme: {
        colors: {
            emerald: '#4f9870',
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1590px',
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1590px',
            },
        },
    },
} satisfies Config;
