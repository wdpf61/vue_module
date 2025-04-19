
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { useAuthStore } from './store/AuthStore';
import { createPinia } from 'pinia';

import { ApolloClients } from '@vue/apollo-composable'
import apolloClient from './apollo/ApolloClient';


const app = createApp(App)

app.provide(ApolloClients, {
  default: apolloClient,
})

app.use(createPinia()).use(router).mount('#app')


const auth = useAuthStore();
auth.initAuth(); // Set token from localStorage on load