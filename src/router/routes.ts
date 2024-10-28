import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      name: 'LoginPage',
      path: '',
      component: () => import('pages/LoginPage.vue'),
    }],
  },
  {
    path: '/sign-up',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SignUpPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '', component: () => import('pages/MainPage.vue'), name: 'MainLayout', meta: { reqiresAuth: true },
    }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
