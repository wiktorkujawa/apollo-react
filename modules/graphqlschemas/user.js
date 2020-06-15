module.exports = `
  type User {
    id: ID
    email: String
    name: String
    register_date: String
  },
 
  type Query {
    user: User
  },

   type Error {
     path: String!
     message: String!
   },

  type Mutation {
    register(email: String!, name: String!, password: String!): [Error!]
    login(email: String!, password: String!): [Error!]
    logout: Boolean!
  }
`;