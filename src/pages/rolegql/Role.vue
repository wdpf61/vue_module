<template>
    <div>
      <h1>Roles</h1>
      <input v-model="newRole" @keyup.enter="addnewRole" placeholder="Add Role" />
       <table class="table ">
         <thead>
           <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
           </tr>
         </thead>
         <tbody>
          <tr v-for="role in roleStore.roles" :key="role.id">
            <th>{{ role.id }}</th>
            <th>{{ role.name }}</th>
            <th>
              <button class="btn btn-info" @click="findRole(role.id)">Edit</button>
              <button class="btn btn-danger" @click="remove(role.id)">Delete</button>
            </th>
           </tr>
         </tbody>
       </table>
    </div>
  </template>
  
  <script setup>
  import { useRoleStoreGQL } from '@/store/RoleStoreGraphQL'
import { ref, onMounted } from 'vue'

  
  const roleStore = useRoleStoreGQL()
  const newRole = ref('')
  const roleId = ref('')
  
  onMounted(() => {
    roleStore.fetchRoles()
  })
  
  const addnewRole = async () => {
    if (newRole.value.trim()) {
      await roleStore.addRole(newRole.value , roleId.value )
      newRole.value = ''
      await roleStore.fetchRoles()
    }
  }

  // const update = id => {
  //   roleStore.removeRole(id)
  //   roleStore.fetchRoles()
  // }
  const remove = id => {
    roleStore.removeRole(id)
    roleStore.fetchRoles()
  }


  const findRole =async (id) => {
    await roleStore.findRole(id)
    newRole.value= roleStore.role.name;
    roleId.value= roleStore.role.id;
  }
  </script>
  