import { gql } from '@apollo/client/core'

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
    }
  }
`

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String! , $id:ID) {
    createRole(name: $name, id: $id) {
      id
      name
    }
  }
`
export const FIND_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      name
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $name: String!) {
    updateRole(id: $id, name: $name) {
      id
      name
    }
  }
`

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
      id
      name
    }
  }
`
