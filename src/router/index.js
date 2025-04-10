import MainLayout from '@/layout/MainLayout.vue';
import Contact from '@/pages/Contact.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Login from '@/pages/Login.vue';
import Signin from '@/pages/loginRegister/Signin.vue';
import NotFound from '@/pages/NotFound.vue';
import CreateRole from '@/pages/roles/CreateRole.vue';
import Roles from '@/pages/roles/Roles.vue';
import UpdateRole from '@/pages/roles/UpdateRole.vue';
import CreateUser from '@/pages/users/CreateUser.vue';
import UpdateUser from '@/pages/users/UpdateUser.vue';
import Users from '@/pages/users/Users.vue';
import Users2 from '@/pages/users/Users2.vue';
import Users3 from '@/pages/users/Users3.vue';
import { useAuthStore } from '@/store/AuthStore';

import { createRouter, createWebHistory } from 'vue-router'



const routes = [

  {path: '/', name: 'Login', component: Signin, meta: { public: true },},
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'contact', component: Contact },
      { path: 'roles', component: Roles },
      { path: 'roles/create', component: CreateRole },
      { path: 'roles/edit/:roleId', component: UpdateRole },
      { path: 'users', component: Users3 },
      { path: 'users/create', component: CreateUser },
      { path: 'users/edit/:id', component: UpdateUser },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


// // Navigation guard
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   if (!to.meta.public && !auth.token) {
//     return next('/login');
//   }
//   next();
// });




export default router;