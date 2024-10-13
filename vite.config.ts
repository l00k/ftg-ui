import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { fileURLToPath, URL } from 'node:url';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

const env = process.env.NODE_ENV || 'production';
const isDev = env !== 'production';


export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
        },
    },
    css: {
        devSourcemap: isDev,
        preprocessorOptions: {
            scss: {
                includePaths: [
                    'node_modules',
                ],
            },
        },
        postcss: {
            plugins: [
                postcssImport,
                tailwindcss,
                autoprefixer,
            ],
        },
    },
    build: {
        target: 'esnext',
        sourcemap: false,
    },
    server: {
        cors: true,
    },
});
