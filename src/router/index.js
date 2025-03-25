import Contact from '@/pages/Contact.vue';
import Dashboard from '@/pages/Dashboard.vue';
import NotFound from '@/pages/NotFound.vue';
import CreateRole from '@/pages/roles/CreateRole.vue';
import Roles from '@/pages/roles/Roles.vue';
import UpdateRole from '@/pages/roles/UpdateRole.vue';
import Users from '@/pages/users/Users.vue';

import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  { path: '/', component: Dashboard },
  { path:'/contact', component: Contact },

  { path:'/roles', component: Roles },
  { path:'/createRole', component: CreateRole},
  { path:'/roles/edit/:id', component: UpdateRole},
  { path:'/users', component: Users },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;