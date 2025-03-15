<script setup>
let students =
    `<li> Habib</li>
    <li> Salam</li>
    <li> Jamil</li>
    <li> Barkat</li>
    <li> Rashed</li>
`
</script>


<template>
    <h1>Student List </h1>
    <ul v-html="students">
    </ul>

</template>