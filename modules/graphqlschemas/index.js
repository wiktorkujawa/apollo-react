// ./graphql/types/index.js
const { mergeTypeDefs } = require('@graphql-tools/merge');
const launch = require('./launch');
const post = require('./post');
const user = require('./user');

const types = [
  launch,
  post,
  user
];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
module.exports = mergeTypeDefs(types, { all: true });