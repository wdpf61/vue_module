<script setup>
import api from '@/Api';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';



const users = ref([]);
const roles = ref([]);
const search = ref('');

const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

// fetchUsers
const fetchUsers = (url = "/users") => {
    if (typeof url !== 'string') {
        console.log(url);
        url = '/users'; // fallback to default
    }
    api.get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data);
            users.value = result.data
        }).catch((err) => {
            console.log(err);
        });
}
// fetchRoles
const fetchRoles = () => {

    api.get("/roles")
        .then((result) => {
            roles.value = result.data.roles
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
    fetchUsers()
    fetchRoles()
});


// create users
const userData = reactive({
    name: "",
    email: "",
    photo: "",
    role_id: "",
    mobile: ""
})

const onFileChange = (e) => {
    userData.photo = e.target.files[0];
}




const createUser = () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('role_id', userData.role_id);
    formData.append('photo', userData.photo);
    formData.append('mobile', userData.mobile);

       api.post('/users', formData)
       .then((result) => {
         console.log(result.data);

       }).catch((err) => {
        console.log(err.data);
       });
}


// Edit User



</script>


<template>
    {{ search }}
    <div class="row m-1">
        <div class="col-12 ">
            <h4 class="main-title">List Table</h4>
            <ul class="app-line-breadcrumbs mb-3">
                <li class="">
                    <a href="#" class="f-s-14 f-w-500">
                        <span>
                            <i class="ph-duotone  ph-table f-s-16"></i> Table
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="#" class="f-s-14 f-w-500">All Users</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <!-- List Js Table start -->
        <div class="col-xxl-8">
            <div class="card equal-card ">
                <div class="card-header">
                    <h5>Add, Edit &amp; Remove table</h5>
                </div>
                <div class="card-body p-0">
                    <div id="myTable">
                        <div class="list-table-header d-flex justify-content-sm-between mb-3">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">Add</button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <form @submit.prevent="createUser" id="add_employee_form" enctype="multipart/form-data">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add User
                                                </h1>
                                                {{ userData }}
                                                <button type="button" class="btn-close m-0" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">

                                                <div class="employee mb-3">
                                                    <input type="hidden" id="id-field">
                                                    <label class="form-label">User :</label>
                                                    <input v-model="userData.name" class="form-control" type="text"
                                                        id="employee-field" placeholder="user" required="">
                                                </div>

                                                <div class="email mb-3">
                                                    <label class="form-label">Email :</label>
                                                    <input v-model="userData.email" class="form-control" type="email"
                                                        id="email-field" placeholder="email" required="">
                                                </div>

                                                <div class="contact mb-3">
                                                    <label class="form-label">Mobile :</label>
                                                    <input v-model="userData.mobile" class="form-control" type="text"
                                                        id="contact-field" placeholder="contact" required="">
                                                </div>

                                                <div class="date mb-3">
                                                    <label class="form-label">Photo :</label>
                                                    <input @change="onFileChange" class="form-control" type="file"
                                                        id="date-field" required="" name="photo">
                                                </div>

                                                <div class="status mb-3">
                                                    <label class="form-label">Role</label>
                                                    <select v-model="userData.role_id" class="form-select"
                                                        id="status-field" aria-label="Default select example">
                                                        <option selected disabled value="">Select Role</option>
                                                        <option v-for="role in roles" :key="role.id"
                                                            :value="`${role.id}`">{{ role.name }}</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="modal-footer add">
                                                <input type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                    value="Close">
                                                <input type="submit" class="btn btn-primary" id="add-btn" value="Add">
                                                <button class="btn btn-success" id="edit-btn"
                                                    style="display: none;">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <form class="app-form app-icon-form " action="#">
                                <div class="position-relative ">
                                    <input v-model="search" @input="fetchUsers" placeholder="Search..."
                                        class="form-control" aria-label="Search">
                                    <i class="ti ti-search text-dark"></i>
                                </div>
                            </form>
                        </div>

                        <div class="overflow-auto app-scroll">
                            <table class="table table-bottom-border  list-table-data align-middle mb-0">
                                <thead>
                                    <tr class="app-sort">
                                        <th>
                                            <input type="checkbox" class="form-check-input  checkAll" name="checkAll">
                                        </th>
                                        <th class="d-none">ID</th>
                                        <th class="sort" data-sort="employee" scope="col">Employee</th>
                                        <th class="sort" data-sort="email" scope="col">Email</th>
                                        <th class="sort" data-sort="contact" scope="col">contact</th>
                                        <th class="sort" data-sort="contact" scope="col">Role Id</th>
                                        <th class="sort" data-sort="date" scope="col">Photo</th>

                                        <th class="sort" data-sort="action" scope="col">Edit</th>
                                        <th class="sort" data-sort="action" scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody class="list" id="t-data">
                                    <tr v-for="user in users.data">
                                        <th scope="row"><input class="form-check-input mt-0 ms-2" type="checkbox"
                                                name="item"></th>
                                        <td class="id d-none">{{ user.id }}</td>
                                        <td class="employee">{{ user.name }}</td>
                                        <td class="email">{{ user.email }}</td>
                                        <td class="contact">{{ user.mobile }}</td>
                                        <td class="role">{{ user.role_id }}</td>
                                        <td class="date"><img :src="`${imgUrl}/${user.photo}`" alt="" srcset=""></td>

                                        <td class="edit"><button class="btn edit-item-btn btn-sm btn-success"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                @click="editUser(user.id)">Edit</button>
                                        </td>
                                        <td class="remove"><button @click="deleteUser(user.id)"
                                                class="btn remove-item-btn btn-sm btn-danger">Remove</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="list-pagination">
                            <ul class="pagination">
                                <li v-for="page in users.links" :key="page.label"
                                    :class="page.active ? 'active cursor-pointer' : 'cursor-pointer'"><a class="page"
                                        @click="fetchUsers(page.url)" data-i="1" data-page="4">{{
                                        formatPageLabel(page.label) }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- List Js Table end -->
    </div>
</template>

<style></style>