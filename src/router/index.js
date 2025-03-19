import { createRouter, createWebHistory } from 'vue-router';
import Students from '@/components/Students.vue';
import Index from '@/components/role/Index.vue';
import Update from '@/components/role/Update.vue';
import Create from '@/components/role/create.vue';
const routes = [
  { path: '/', component: Index },
  { path: '/edit/:id', name: 'EditItem', component: Update, props: true },
  { path: '/create', name: 'CreateRole', component: Create },
//   { path: '/about', component: About },
//   { path: '/user/:id', component: User },
//   { path: '/old-route', redirect: '/new-route' },
//   { path: '/:pathMatch(.*)*', component: NotFound }, // Catch-all route

//   { path: '/', name: 'ItemList', component: ItemList },
//   { path: '/create', name: 'CreateItem', component: CreateItem },
//   { path: '/edit/:id', name: 'EditItem', component: EditItem, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
