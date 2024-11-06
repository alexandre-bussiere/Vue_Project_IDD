import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import GetGoogleMailPage from '@/pages/GetGoogleMailPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/get-email',
        name: 'GoogleMail',
        component: GetGoogleMailPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
