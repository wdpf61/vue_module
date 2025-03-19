<script setup>
import { ref } from "vue";
import Person from './components/Person.vue';
import CounterApp from './components/CounterApp.vue';
import Students from './components/Students.vue';
import Conditions from "./components/Conditions.vue";



let headline= ref("IsDB-BISEW");

let toggle = ref(true);

let paragraph_id= ref("asset");

const changId=()=>{
   paragraph_id.value="paragraph"

}


</script>

<template>

   <Conditions/>

  <h1  v-show="toggle">{{ headline }}</h1>
  <p :id="paragraph_id">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, provident expedita temporibus magni ratione commodi ut eos. Quam vitae ex modi consectetur reiciendis dicta minus velit, ducimus fuga asperiores labore aliquam neque voluptate, minima mollitia quisquam praesentium consequatur eaque officiis eos veritatis dolorum, doloremque architecto. Atque numquam nostrum incidunt delectus.</p>
  <br>

   <input v-model="headline" type="text" placeholder="headline">

  <button @click="toggle = !toggle" >Show/Hide</button>
  <button @click="changId" >change Id</button>


  <Person />
  <CounterApp/>

   <Students/>


</template>
<style scoped>


</style>
