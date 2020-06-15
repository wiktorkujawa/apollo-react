const Post = require('../../models/post');
const config = require('config');

module.exports = {
  Query: {
    // Query which returns posts list
    posts: () => Post.find({}),
    post: (parent, post) => Post.findOne({_id: post._id})
  },
  Mutation: {
    addPost: (parent, post) => {
      // Create a new record in the database
      const newPost = new Post({ 
        subject: post.subject, 
        content: post.content
      });
      // Save the record and return it
      return newPost.save();
    },
    deletePost: (parent, post) => {
      // Create a new record in the database
      if(!post)
        throw new Error('Error');
      return Post.findOneAndDelete({ _id: post._id })
    },
    updatePost: (parent, post) => {
      // Create a new record in the database
      if(!post)
        throw new Error('Error');
      return Post.findOneAndUpdate({ _id: post._id },{ $set: post })
    }
  }
};