<template>
    <div>
      <h2>Item List</h2>
      <router-link to="/create">Create New Item</router-link>
      <ul>
        <li v-for="item in role" :key="item.id">
          {{ item.name }}
          <router-link :to="`/edit/${item.id}`">Edit</router-link>
          <button @click="deleteItem(item.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import api from '@/api';
   import { ref, onMounted } from 'vue';
  api
  
  const role = ref([]);
  
  const fetchRole = async () => {
    const response = await api.get('roles');
    console.log(response.data.roles);
    
    role.value = response.data.roles.data;
  };
  
  const deleteItem = async (id) => {
    try {
        let response = await api.get(`rolesdelete?id=${id}`);
        console.log(response.data); // Check response message
        // fetchRole(); // Refresh the roles list
    } catch (error) {
        console.error("Error deleting role:", error);
    }
    // fetchRole();
  };
  
  onMounted(fetchRole);
  </script>
  