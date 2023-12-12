import { createApp } from 'vue';
import app from './App.vue';
import router from './Router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


createApp(app)
.use(router)
.use(PrimeVue, { ripple: true })
.use(ToastService)
.mount('#app');