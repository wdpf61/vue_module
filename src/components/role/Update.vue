<template>
    <div>
      <h2>Edit Item</h2>
      <form @submit.prevent="updateItem">
        <input v-model="item.name" placeholder="Item Name" required />
        <input type="hidden"  name="id" v-model="item.id">
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import api from '@/api';
 import { reactive, onMounted } from 'vue';
 import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const item = reactive({ name: '' , id:""});
  
  const fetchItem = async () => {
    const response = await api.get(`roles/${route.params.id}`);
    console.log(response.data.role);
    item.name = response.data.role.name;
    item.id = response.data.role.id;
  };
  
  const updateItem = async () => {
    let res=  await api.put(`roles/${route.params.id}`, item);

    // console.log(res);
    
     router.push('/');
  };
  
  onMounted(fetchItem);
  </script>
  