
<script setup>
import {reactive} from 'vue';

let person= reactive({
   name:"Hasibul Hasan",
   age:15,
   phone:"01912556666",
   address:"Dhaka"
});

const changeName =()=>{
    return person.name= "Raqeebul";
}

</script>
<template>
  <h2>Prerson</h2>
   <p>Name: {{ person.name }}</p>
   <p>Age: {{ person.age }}</p>
   <p>Phone: {{ person.age }}</p>
   <p>Address: {{ person.address }}</p>

   <button @click="changeName">ChangeName</button>
   <!-- <button v-on:click="">ChangeName</button> -->
</template>

