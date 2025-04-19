import { defineStore } from 'pinia'

import { CREATE_ROLE, DELETE_ROLE, FIND_ROLE, GET_ROLES, UPDATE_ROLE } from '@/graphql/Role'
import apolloClient from '@/apollo/ApolloClient';


export const useRoleStoreGQL = defineStore('Rolegql', {
  state: () => ({
    roles: [],
    role:{}
  }),

  actions: {
    
    async fetchRoles() {
      const res = await apolloClient.query({ query: GET_ROLES })
      console.log(res.data.roles);
      this.roles = res.data.roles
    },

    async addRole(name, id) {
      const res = await apolloClient.mutate({
        mutation: CREATE_ROLE,
        variables: { name, id },
      })
      // this.roles.push(res.data.roles)
    },

    async updateRole(id, name) {
      await apolloClient.mutate({
        mutation: UPDATE_ROLE,
        variables: { id, name },
      })
      const role = this.roles.find(t => t.id === id)
    },

    async findRole(id) {
     const res=  await  apolloClient.query({
        query: FIND_ROLE,
        variables: { id },
      })
       console.log(res.data.role);
       
       this.role= res.data.role
    },

    async removeRole(id) {
      await apolloClient.mutate({
        mutation: DELETE_ROLE,
        variables: { id },
      })
      this.roles = this.roles.filter(t => t.id !== id)
    },
  },
})
