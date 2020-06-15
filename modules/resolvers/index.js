const { mergeResolvers } = require('@graphql-tools/merge');
const launch = require('./launch');
const post = require('./post');
const user = require('./user');

const resolvers = [
  launch,
  post,
  user
];

module.exports = mergeResolvers(resolvers);