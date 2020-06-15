import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      _id
      subject
      content
    }
  }
`;

export const POST_QUERY = gql`
  query PostQuery($_id: ID!) {
    post(_id: $_id) {
      subject
      content
    }
  }`;

export const ADD_POST = gql`
  mutation($subject: String!, $content: String!) {
    addPost(subject: $subject, content: $content) {
      subject
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation($_id: ID!) {
    deletePost(_id: $_id) {
      subject
      content
    }
  }
`;

export const UPDATE_POST = gql`
  mutation($_id: ID!, $subject: String, $content: String) {
    updatePost(_id: $_id ,subject: $subject, content: $content) {
      subject
      content
    }
  }
`;