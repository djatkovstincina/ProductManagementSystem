import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import '../src/style.scss';

loadFonts();

const app = createApp(App);

router.beforeEach((to) => {
    document.title = to.meta.title || 'Product Management System';
});

app.use(vuetify);
app.use(router);

app.mount('#app');