<template>
    <div>
        <div class="col-md-12">
            <div class="card">
                {{ userData }}
                <div class="card-header">
                    <h5>Baisc Form Controls</h5>
                </div>
                <form @submit.prevent="submitFormData">
                    <div class="card-body">
                        <div class="app-form">
                            <div class="mb-3">
                                <img width="100" :src="`${imgUrl}/${userData.photo}`" alt="" srcset="">
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input v-model="userData.name" type="text" class="form-control"
                                    placeholder="Enter Your Username" id="username">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="userData.password" type="password" class="form-control"
                                    placeholder="Enter Your Password" id="password">
                            </div>
                            <div class="mb-3">
                                <label for="city" class="form-label">Role</label>
                                <select v-model="userData.role_id" class="form-select" id="city">
                                    <option disabled value="">Select Role</option>
                                    <option v-for="role in roles" :key="role.id" :value="role.id"
                                        :selected="role.id === userData.role_id">
                                        {{ role.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>

                                <input v-model="userData.email" type="text" class="form-control"
                                    placeholder="abc@gmail.com">

                            </div>
                            <div class="mb-3">
                                <label for="address" class="form-label">Photo</label>
                                <input @change="imageUp" type="file" name="photo" class="form-control">
                            </div>

                            <div>
                                <button type="button" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const roles = ref([]);
const { id } = useRoute().params
const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

const fetchUser = () => {
    api.get(`/users/${id}`)
        .then((result) => {
            console.log(result.data)
            userData.id = result.data.user.id
            userData.name = result.data.user.name
            userData.email = result.data.user.email
            userData.photo = result.data.user.photo
            userData.role_id = result.data.user.role_id

        }).catch((err) => {
            console.log(err)
        });
}
const fetchRoles = () => {
    api.get("/roles")
        .then((result) => {
            console.clear()
            console.log(result.data)
            roles.value = result.data.roles
        }).catch((err) => {
            console.log(err)
        });
}
onMounted(() => {
    fetchUser()
    fetchRoles()
})

const userData = reactive({
    id: "",
    name: "",
    email: "",
    role_id: "",
    password: "",
    photo: ""
})

const imageUp = (e) => {
    userData.photo = e.target.files[0];
}


// save data 

const submitFormData = () => {

    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("role_id", userData.role_id);
    formData.append("photo", userData.photo);
    formData.append("password", userData.password);


    api.put(`/users/${userData.id}`, formData)
        .then((result) => {
            console.clear()
            console.log(result.data)
            roles.value = result.data.roles
        }).catch((err) => {
            console.log(err)
        });
}


</script>

<style></style>