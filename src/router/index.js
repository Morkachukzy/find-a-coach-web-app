import {defineAsyncComponent} from "vue";
import {createRouter, createWebHistory} from 'vue-router';
import store from '@/store/index';

const router = createRouter({
    history: createWebHistory(), routes: [{
        path: '/', redirect: '/coaches'
    }, {
        path: '/coaches', component: defineAsyncComponent(() => import('@/views/coaches/CoachList'))
    }, {
        path: '/coaches/:id',
        component: defineAsyncComponent(() => import('@/views/coaches/CoachDetails')),
        props: true,
        children: [{
            path: 'contact',
            component: defineAsyncComponent(() => import('@/views/requests/ContactCoach')),
            props: true, //coaches/c1/contact
        }]
    }, {
        path: '/register',
        component: defineAsyncComponent(() => import('@/views/coaches/CoachRegistration')),
        meta: {requiresAuth: true}
    }, {
        path: '/requests',
        component: () => defineAsyncComponent(() => import('@/views/requests/RequestsReceived')),
        meta: {requiresAuth: true}
    }, {
        path: '/auth',
        component: defineAsyncComponent(() => import('@/views/auth/UserAuth')),
        meta: {requiresUnauth: true}
    }, {
        path: '/:notFound(.*)', component: defineAsyncComponent(() => import('@/views/notFound'))
    }]
});

router.beforeEach((to, _, next) => {
    if (to.meta?.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;