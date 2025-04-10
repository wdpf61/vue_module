import api from "@/Api";
import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      loading: false,
      users: [],
      error: null,
      search:null
    };
  },

  getters: {},
  actions: {
     fetchUsers(url = "/users"){
        if (typeof url !== 'string') {
            console.log(url);
            url = '/users'; // fallback to default
        }
        this.loading= true;
        api.get(url, { params: { search: this.search } })
            .then((result) => {
                console.log(result.data.data);
               this.loading= false;
               this.users = result.data.data
            }).catch((err) => {
                this.loading= false;
                this.error=err
                console.log(err);
            });
    }, 

     deleteUser(id){
        console.log(id);
        api.delete(`/users/${id}`)
        .then((result) => {
           console.log(result)
           fetchUsers()
        }).catch((err) => {
            console.log(err)
        });
    }
    
  },
});
