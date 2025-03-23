<script setup>
  import Footer from './layout/Footer.vue'
  import Navbar from './layout/Navbar.vue'
  import Header from './layout/Header.vue'
  import Modal from './layout/Modal.vue'
import Dashboard from './pages/Dashboard.vue'

</script>

<template>
 <div class="app-wrapper">
<!-- 
<div class="loader-wrapper">
  <div class="loader_16"></div>
</div> -->

 <Navbar/>

<div class="app-content">
  <div class="">

    <Header/>
   
    <!-- Body main section starts -->
    <main>
      <div class="container-fluid">
        <!-- <RouterView /> -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</div>
<!-- Body main section ends -->


<!-- tap on top -->
<div class="go-top">
  <span class="progress-value">
    <i class="ti ti-arrow-up"></i>
  </span>
</div>

  <Footer/>
</div>

<!-- modal -->

<Modal/>

</template>
<style scoped>
</style>
