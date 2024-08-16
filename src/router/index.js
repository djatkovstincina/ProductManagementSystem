import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { title: 'Home - Product Management System' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;