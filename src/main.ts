import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Private from './layouts/Private.vue'
import Public from './layouts/Public.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import customPlugin from './plugins/custom-plugin'
import ToastPlugin from 'vue-toast-notification'
import { PRIVATE, PUBLIC } from './constants'
import 'vue-toast-notification/dist/theme-sugar.css'
import './assets/style.scss'

const app = createApp(App);

// register layouts
app.component(PRIVATE, Private);
app.component(PUBLIC, Public);

app.use(vuetify);
app.use(customPlugin);
app.use(ToastPlugin);
app.use(createPinia());
app.use(router);

app.mount('#app');
