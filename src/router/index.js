import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ConversationsIndexPage from '@/pages/ConversationsIndexPage.vue';
import ConversationShowPage from '@/pages/ConversationShowPage.vue';
import store from '@/store/user';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/conversations',
        name: 'ConversationsIndex',
        component: ConversationsIndexPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next('/');
            } else {
                next();
            }
        }
    },
    {
        path: '/conversations/:id',
        name: 'ConversationShow',
        component: ConversationShowPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next('/');
            } else {
                next();
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
