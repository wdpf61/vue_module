<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
let month = ref("RAMADAN")
let show = ref(true);
let products = [
    { id: 1, name: "Potato" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Mango" },
    { id: 4, name: "Lichi" },
    { id: 5, name: "Lemon" },
]

let procutstlaravel = ref([])

onMounted(() => {
    axios.get("http://localhost/Laravel/project/public/api/products")
        .then(res => {
            console.log(res);
            procutstlaravel.value = res.data.products;
        }).catch(err => {
            console.log(err)
        })
});

</script>


<template>
    <div>

        <h1 v-if="show">This is {{ month }}</h1>
        <button @click="show = !show">Show/Hide</button>
    </div>
    <div>
        <h2>Fruit List</h2>
        <ul>
            <li v-for="product in products" key="product.id">{{ product.name }}</li>
        </ul>
    </div>

    <div>
        <table class="table table-striped" border="1">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in procutstlaravel" key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<style scoped></style>