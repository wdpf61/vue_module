<template>




    <div class="row">
        <!-- Baisc Form Controls start -->
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5>Baisc Form Controls</h5>
                </div>
                  {{ formData }}
                <div class="card-body">
                    <form @submit.prevent="submitData">
                        <div class="app-form">
                            <div class="mb-3">
                                <label for="username" class="form-label">name</label>
                                <input v-model="formData.name" type="text" class="form-control" placeholder="Enter Your Username" id="username">
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
import api from '@/Api';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';


const { id } = useRoute().params

onMounted(() => {
    fetchRole()
})
const fetchRole = () => {
    api.get(`/roles/${id}`)
        .then((result) => {
            console.log(result.data);
            formData.id=  result.data.roles.id
            formData.name=  result.data.roles.name
        }).catch((err) => {
            console.log(err);
        });
}

const formData= reactive({
    id:"",
    name:""
})

const submitData= ()=>{

    api.put("/roles/"+formData.id, formData)
    .then((result) => {
        console.log(result.data);
    }).catch((err) => {
        console.log(err);
    });


}


</script>

<style></style>