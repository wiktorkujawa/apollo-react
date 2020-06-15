import gql from 'graphql-tag';

export const REGISTER = gql`
mutation($email: String!,
  $name: String! 
  $password: String!){
    register(email: $email, name: $name, password: $password)
    {
      path
      message
    }
  }
`

export const LOGIN = gql`
mutation($email: String!, 
  $password: String!){
    login(email: $email, password: $password)
    {
      path
      message
    }
  }
`

export const USER_QUERY = gql`
query UserQuery {
  user {
    name
    email
  }
}`;

export const USER = gql`
mutation($email: String!, 
  $password: String!){
    login(email: $email, password: $password)
    {
      path
      message
    }
  }`

  export const LOGOUT = gql`
  mutation {
    logout
  }
`;