// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/Api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const res = await api.post('/login', credentials);
        // console.log(credentials);
        // console.log(res);
         console.log("token",res.data.authorisation.token);
        this.token = res.data.authorisation.token;
        this.user = res.data.user;

        // Save token in localStorage
        localStorage.setItem('token', this.token);

        // Set token for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (err) {
        throw err;
      }
    },
    logout() {
      api.post('/logout')
      .then((result) => {
        console.log(result);
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }).catch((err) => {
        console.log(err);
      }); 
    },

    initAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    }
  },
});
