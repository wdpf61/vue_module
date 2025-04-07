// stores/products.js
import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/Api';

export const useRoleStore = defineStore('Roles', {
  state: () => ({
    roles: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRoles() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/roles');
        console.log(res.data);
        
        this.roles = res.data.roles;
      } catch (err) {
        this.error = 'Failed to load Roles';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
