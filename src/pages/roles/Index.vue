<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles">
                    <th>{{ role.id }}</th>
                    <th>{{ role.name }}</th>
                    <th>Action</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

const roles = reactive([])

onMounted(() => {
    axios.get("http://localhost/Laravel/project/public/api/roles")
        .then(res => {
            console.log(res.data.roles);
            roles = res.data.roles
        })
        .catch(err => {
            console.log(err);

        })
})



</script>

<style></style>