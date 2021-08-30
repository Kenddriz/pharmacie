import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/account/Login.vue')
  },
  {
    path: '/main',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', alias: 'unit', component: () => import('pages/Units.vue') },
      { path: 'provider', component: () => import('pages/provider/Provider.vue') },
      { path: 'medicine', component: () => import('src/pages/medicine/MedicinePage.vue') },
      { path: 'command', component: () => import('src/pages/command/Command.vue') },
      { path: 'card-stock', component: () => import('src/pages/CardStock.vue') },
      { path: 'command/delivery/:id', component: () => import('src/pages/delivery/Delivery.vue') },
      { path: 'invoice', component: () => import('src/pages/invoice/Invoice.vue') }
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
