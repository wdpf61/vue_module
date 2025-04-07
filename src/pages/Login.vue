<!-- views/Login.vue -->
<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="error" style="color: red">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/store/AuthStore';
import { ref } from 'vue';
  import { useRouter } from 'vue-router';
 
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  const auth = useAuthStore();
  
  const submit = async () => {
    error.value = '';
    try {
      await auth.login({ email: email.value, password: password.value });
      router.push('/dashboard'); // Redirect after login
    } catch (err) {
      error.value = 'Invalid credentials';
      router.push('/login');
    }
  };
  </script>
  