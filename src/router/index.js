import {createRouter, createWebHistory} from 'vue-router';

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
        path: '/register', component: () => import('@/views/coaches/CoachRegistration')
    }, {
        path: '/requests', component: () => import('@/views/requests/RequestsReceived')
    }, {
        path: '/auth', component: () => import('@/views/auth/UserAuth')
    }, {
        path: '/:notFound(.*)', component: () => import('@/views/notFound')
    }]
});


export default router;