import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import SendEmailPage from '@/pages/SendEmailPageMicrosoft.vue';
import EmailManagementPage from '@/pages/EmailManagementPageMicrosoft.vue';
import store from '@/store/user';
import GetGoogleMailPage from '@/pages/GetGoogleMailPage.vue';
import SendGoogleMailPage from '@/pages/SendGoogleMailPage.vue';
import SearchGoogleMailPage from '@/pages/SearchGoogleMailPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },

    {
        path: '/send',
        name: 'SendEmails',
        component: SendEmailPage,
        meta: { requiresAuth: true } // Guard on this page
    },

    {
        path: "/Management",
        name: "EmailManagement",
        component: EmailManagementPage,
        meta: { requiresAuth: true } // Guard on this page
    },
    {
        path: '/get-email',
        name: 'GetGoogleMail',
        component: GetGoogleMailPage,
    },
    {
        path: '/send-email',
        name: 'SendGoogleMail',
        component: SendGoogleMailPage,
    },
    {
        path: "/search-email",
        name: 'SearchGooglemail',
        component: SearchGoogleMailPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guard, if the user is not loggin, he can't go to conversation page
router.beforeEach((to, from, next) => {

    // Verify if the route require a guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // If the requirement of the sigin is equal to false, so if the user is not login
        if (!store.state.user) {
            // Go to HomePage
            alert("You are not login, retry after being login")
            next({ path: '/' });
        }
        else {
            // else access to conversation page
            next();
        }
    }
    else {
        // if no guard, let access to any page without login
        next();
    }
});

export default router;
