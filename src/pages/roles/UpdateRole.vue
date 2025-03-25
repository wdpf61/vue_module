<template>

 


    <div class="row">
            <!-- Baisc Form Controls start -->
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Baisc Form Controls</h5>
                    </div>
                    {{ formdata }}
                    <div class="card-body">
                        <form   @submit.prevent="formSubmit">
                        <div class="app-form">
                            <div class="mb-3">
                                <label for="username" class="form-label">name</label>
                                <input v-model="formdata.name" type="text" class="form-control" placeholder="Enter Your Username" id="username">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
         
        </div>
    
    
    
    </template>
    
    <script setup>
    import axios from 'axios';
    import { reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    
    const router = useRouter()
    const formdata= reactive({
        name:""
    })
    
    const formSubmit=()=>{
        axios.post(`http://localhost/Laravel/project/public/api/roles`,formdata)
      .then(res=>{
        console.log(res);
    
        router.push({ path: '/roles' })
      })
      .catch(err =>{
         console.log(err);
      })
        
    }
    
    
    
    
    
    </script>
    
    <style></style>