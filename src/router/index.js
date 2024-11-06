import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import GetGoogleMailPage from '@/pages/GetGoogleMailPage.vue';
import SendGoogleMailPage from '@/pages/SendGoogleMailPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/get-email',
        name: 'GetGoogleMail',
        component: GetGoogleMailPage
    },
    {
        path: '/send-email',
        name: 'SendGoogleMail',
        component: SendGoogleMailPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
