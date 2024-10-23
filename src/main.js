import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/user'
import vue3googlelogin from 'vue3-google-login'

const app = createApp(App)
let gauthClientId = '293261033772-63ttgm637bajvala85e04qkqh5s8es4u.apps.googleusercontent.com';
app.use(vue3googlelogin, {
    clientId: gauthClientId,
    scope: 'profile email',
    prompt: 'select_account'
});


app.use(store)
app.use(router)
app.mount('#app')