import { loadI18nMessages } from '@/vue/i18n/index.js';
import { installPrimeVue } from '@/vue/prime-vue.js';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import * as VueI18n from 'vue-i18n';
import App from './App.vue';
import { router } from './views/router.js';

const app = createApp(App);

// setup pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);

// setup i18n
const i18n = VueI18n.createI18n({
    legacy: false,
    locale: navigator.language,
    fallbackLocale: 'en',
    messages: await loadI18nMessages([ 'en' ]),
});

app.use(i18n);

// setup router
app.use(router);

// setup PrimeVue
installPrimeVue(app);

// mount app
app.mount('#app');
