import Contact from '@/pages/Contact.vue';
import Dashboard from '@/pages/Dashboard.vue';
import NotFound from '@/pages/NotFound.vue';
import Index from '@/pages/roles/Index.vue';
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  { path: '/', component: Dashboard },
  { path:'/contact', component: Contact },


  { path:'/roles', component: Index },
 



  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;