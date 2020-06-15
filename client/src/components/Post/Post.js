import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { POST_QUERY } from '../../schemas/Post';

const Post = ({ match: { params } }) => {
  let { _id } = params;
  console.log(_id);

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { _id },
  });
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error happen</p>;
  }

  const {
    subject,
    content
  } = data.post;
  return (

    <div>
      <ul className="list-group">
        <li className="list-group-item">
          Subject: {subject}
        </li>
        <li className="list-group-item">
          Content: {content}
        </li>
      </ul>
      <hr />
      <Link to="/posts" className="btn btn-secondary">Back</Link>
    </div>
  )
}

export default Post
