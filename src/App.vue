<script setup>
// import { useRouter } from 'vue-router';

// const router = useRouter();
// router.push('/about'); // Redirects to About page
// router.push({ path: '/user/123' }); // Redirects with dynamic ID

// import { useRoute } from 'vue-router';
// const route = useRoute();
// console.log(route.params.id);
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view> <!-- This displays the routed component -->
  </div>
</template>
<style scoped>


</style>
