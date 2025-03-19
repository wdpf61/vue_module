<template>
    <div>
      <h2>Create Item</h2>
      <form @submit.prevent="createItem">
        <input v-model="item.name" placeholder="Item Name" required />
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import api from '@/api';
import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const item = reactive({ name: '' });
  
  // const createItem = async () => {
  //   await api.post('roles/', item);
  //   router.push('/');
  // };



  const createItem = async () => {
    try {
        let response = await api.post("roles", 
        { name:item.name }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            withCredentials: false, 
        });

        console.log(response.data);
        router.push('/');
    } catch (error) {
        console.error("Error:", error);
    }
};



  </script>
  