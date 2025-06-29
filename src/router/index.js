import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AddProductView from '@/views/AddProductView.vue';
import EditProductView from '@/views/EditProductView.vue';
import axios from 'axios';

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProductView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
      next();
    } catch (err) {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
