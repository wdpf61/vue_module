import api from '@/Api'
import {defineStore} from 'pinia'
import { useUserStore } from './UserStore'

const userStore= useUserStore()
export const useRoleStore= defineStore("roles",
{
  state: ()=>{
    return{
      roles:[],
      loading:false,
      error:null

    }
  },
  getters: ()=>{

  },
  actions: {

    fetchRoles(){
      this.loading=true;
     api.get("/role")
     .then((result) => {
      console.log(result.data);
      this.loading=false;
      this.roles= result.data.roles
     }).catch((err) => {
      console.log(err);
      this.loading=false;
      this.error=err
     })
    },



    fetchRole(id){
      
    },

    updateRole(id){

    },

    deleteRole(id){

    }
  }
},
)

