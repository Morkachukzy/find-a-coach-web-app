import {createRouter, createWebHistory} from 'vue-router';
import store from '@/store/index';
const router = createRouter({
    history: createWebHistory(), routes: [{
        path: '/', redirect: '/coaches'
    }, {
        path: '/coaches', component: () => import('@/views/coaches/CoachList')
    }, {
        path: '/coaches/:id', component: () => import('@/views/coaches/CoachDetails'), props: true, children: [{
            path: 'contact', component: () => import('@/views/requests/ContactCoach'), props: true, //coaches/c1/contact
        }]
    }, {
        path: '/register', component: () => import('@/views/coaches/CoachRegistration'), meta: {requiresAuth: true}
    }, {
        path: '/requests', component: () => import('@/views/requests/RequestsReceived'),  meta: {requiresAuth: true}
    }, {
        path: '/auth', component: () => import('@/views/auth/UserAuth'),  meta: {requiresUnauth: true}
    }, {
        path: '/:notFound(.*)', component: () => import('@/views/notFound')
    }]
});

router.beforeEach((to, _, next) => {
    if (to.meta?.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches');
    } else{
        next();
    }
})

export default router;