<script setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';
import { useAuthStore } from '@/store/AuthStore';
import { useUserStore } from '@/store/UserStore';



const users = ref([]);
const pagination = ref([]);
const roles = ref([]);
const search = ref('');
const modalForm = ref(null)

const users2= useUserStore()

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

// fetchUsers
const fetchUsers = (url = "/users") => {

    if (typeof url !== 'string') {
        console.log(url);
        url = '/users'; // fallback to default
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data.data);
            users.value = result.data.data
        }).catch((err) => {
            console.log(err);
        });
}




// const debouncedFetchUsers = debounce(fetchUsers, 300);
const formatPageLabel = (label) => {
    if (label === '&laquo; Previous') return 'Previous';
    if (label === 'Next &raquo;') return 'Next';
    return label;
};

onMounted(() => {
    // fetchUsers()
    users2.fetchUsers()
   
});


// delete User
const deleteUser=(id)=>{
    console.log(id);
    
    api.delete(`/users/${id}`)
    .then((result) => {
       console.log(result)
       fetchUsers()
    }).catch((err) => {
        console.log(err)
    });
}


</script>
<template>
    <div class="card-body p-0">
         <div v-if="users2.loading"> Loading</div>
        <div v-if="users2.error"> {{ users2.error }}</div>
        <div v-else class="table-responsive">
            <table class="table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Role_id</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users2.users">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td> <img width="100" :src="`${imgUrl}/${user.photo}`" alt="" srcset=""></td>
                        <td>{{ user.role.name }}</td>
                        <td class="btn btn-group">
                            <RouterLink :to="`/users/edit/${user.id}`" class="btn btn-info">
                                Edit
                            </RouterLink>

                         <a class="btn btn-danger" @click="deleteUser(user.id)">Delete</a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>