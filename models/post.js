// #1 Import the constructor Schema and the model() method
// Note the use of ES6 desctructuring
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// #2 Instantiate a schema using mongoose Schema
const postSchema = new Schema({
  subject: {
    type: String
  },
  content: {
    type: String
  }
});

// #3 Create a model with mongoose model() method
module.exports = Post = mongoose.model('post', postSchema);