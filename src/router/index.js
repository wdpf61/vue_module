import Contact from '@/pages/Contact.vue';
import Dashboard from '@/pages/Dashboard.vue';
import { createMemoryHistory, createRouter } from 'vue-router'



const routes = [
  { path: '/', component: Dashboard },
  { path:'/contact', component: Contact },
  { path: '/foo', component: Contact },
 
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;