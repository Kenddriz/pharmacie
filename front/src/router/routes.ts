import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/account/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue')
      },
      {
        path: 'test',
        component: () => import('pages/Dashboard.vue')
      },
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'unit', component: () => import('pages/Units.vue') },
      { path: 'provider', component: () => import('pages/provider/Provider.vue') },
      { path: 'medicine', component: () => import('pages/medicine/MedicinePage.vue') },
      { path: 'command', component: () => import('pages/command/Command.vue') },
      { path: 'invoice', component: () => import('pages/invoice/Invoice.vue') },
      { path: '', alias: 'sale', component: () => import('pages/sale/Sale.vue') }
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
