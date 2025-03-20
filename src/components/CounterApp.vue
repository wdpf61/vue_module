<script setup>
import { computed, ref, watch } from "vue";

let firstName= ref("Habib")
let lastName= ref("Hasan")


let count= ref(0);
const increase = ()=> count.value ++ ;
const decrease = ()=> count.value -- ;


let fullName= computed(()=>{
     return firstName.value +" "+ lastName.value
})


const fullName2= ()=> firstName.value +" "+ lastName.value;

  watch(count, (prev, current)=>{
     console.log(prev);
     console.log(current);
  })

</script>

<template>
 
  <h1>First Name : {{ firstName }}</h1>
  <h1>Last Name : {{ lastName }}</h1>
  <h1>Full Name : {{ fullName }}</h1>
  <h1>Full Name 2: {{ fullName2() }}</h1>

  <input type="text" v-model="firstName" /> <br>
  <input type="text" v-model="lastName" />


<h1>Counter</h1>
<p>Value {{ count }} </p>
<button @click="decrease" >Minus</button>
<button @click="increase">Plus</button>


</template>

<style>
</style>