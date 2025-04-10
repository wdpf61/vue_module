<template>
  <div>
        i am child <br>

        My name is {{ props.name }} <br>
        My brother name is {{ myBrother }}
  </div>
</template>

<script  setup>
import { inject } from 'vue';

const props= defineProps(['name'])

const myBrother= inject("secondChild")
</script>

<style>

</style>