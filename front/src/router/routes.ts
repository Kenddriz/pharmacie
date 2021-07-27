import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/account/Login.vue'),
    children: [],
  },
  {
    path: '/main',
    component: () => import('src/layouts/main/MainLayout.vue'),
    children: [
      {
        path: '',
        alias: 'unit',
        component: () => import('pages/unit/Unit.vue')
      },
      {
        path: 'provider',
        component: () => import('pages/provider/Provider.vue')
      },
      {
        path: 'medicine',
        component: () => import('pages/medicine/Medicine.vue')
      },
      {
        path: 'command',
        component: () => import('pages/command/Command.vue')
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
