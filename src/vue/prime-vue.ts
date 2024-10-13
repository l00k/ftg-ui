import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import type { App } from 'vue';

const MyPreset = definePreset(Aura, {
    primitive: {
        emerald: {
            50: '#ecfdf5',
            100: '#dceae2',
            200: '#b9d6c6',
            300: '#95c1a9',
            400: '#72ad8d',
            500: '#4f9870',
            600: '#478965',
            700: '#3f7a5a',
            800: '#376a4e',
            900: '#284c38',
            950: '#182e22',
        },
    },
    components: {
        datatable: {
            styleClass: 'border-0',
        },
    },
});

export function installPrimeVue (app : App)
{
    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(DialogService);

    app.use(PrimeVue, {
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: '.p-dark',
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities',
                },
            },
        },
    });
}
