<template>
  <div>
      Parent <br>
      my child name is {{ props.garanChildname }}
      <hr>
        slot is printed here 
        <slot></slot>

      <hr>
      <Child :name="props.garanChildname "/>

      <hr>
         this is footer slot
        <slot name="footer"></slot>

      <hr>
  </div>
</template>

<script  setup>
import Child from './Child.vue';
const props= defineProps(['garanChildname'])

</script>

<style>

</style>