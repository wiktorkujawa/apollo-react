import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import PostItem from './PostItem';
import AddPost from './AddPost';
import { POSTS_QUERY } from '../../schemas/Post';

const Posts = () => {
  const {
    loading,
    error,
    data,
    refetch: refetchPosts
  } = useQuery(POSTS_QUERY)

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error happen</p>;
  }

  return (
    <>
      <h1 className="display-4 my-3">Posts</h1>
      {
        data.posts.map(post => (
          <PostItem key={post._id} post={post} refetchPosts={refetchPosts} />
        ))
      }
      <AddPost refetchPosts={refetchPosts}/>
    </>
  )
}

export default Posts
