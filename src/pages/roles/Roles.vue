<script setup>
import api from '@/Api';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

const roles = ref([])

onMounted(() => {
    fetchRoles()
})

const fetchRoles= ()=>{
    api.get("/roles")
        .then(res => {
            console.log(res.data.roles);
            roles.value = res.data.roles
        })
        .catch(err => {
            console.log(err);

        })
}

const deleterole= (id)=>{
  api.delete(`/roles/${id}`)
  .then(res=>{
    console.log(res);
    if (res.data.roles) {
        fetchRoles()
    }
  })
  .catch(err =>{
     console.log(err);
     
  })
   
}



</script>


<template>
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
                    <a href="#" class="f-s-14 f-w-500">List Table</a>
                  </li>
                </ul>
              </div>
            </div>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <h3><RouterLink to="/createRole">Add Roles</RouterLink></h3>
                </div>
                <div class="card-body">
                    <div>
                        <table class="table table-striped">
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
                                    <th>
                                      <RouterLink :to="`/roles/edit/${role.id}`" class="btn btn-primary">Edit</RouterLink>
                                         <a class="btn btn-danger" @click="deleterole(role.id )">Delete</a>  
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>



<style></style>