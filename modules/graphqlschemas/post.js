module.exports = `
  type Post {
    _id: ID,
    subject: String,
    content: String
  },

  type Query {
    posts: [Post]
    post(_id: ID!): Post
  },

  type Mutation {
    addPost(
      subject: String!,
      content: String!,
       ): Post,

    deletePost(_id: ID!): Post,

    updatePost(_id: ID!
      subject: String,
      content: String
      ): Post
  }
`;