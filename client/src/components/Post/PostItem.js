import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST, UPDATE_POST } from '../../schemas/Post';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

const PostItem = ({ post: { _id, subject, content }, refetchPosts }) => {
  const [newPost, setNewPost] = useState({
    subject: subject,
    content: content
  });

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [updatePost] = useMutation(UPDATE_POST);

  const onChange = e => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };
  
  const onSubmit = async (id) => {
    await updatePost({ variables: { _id: id, subject: newPost.subject, content: newPost.content  } }); 
    refetchPosts()
}


  const [deletePost] = useMutation(DELETE_POST);
  
  const onDeleteClick = async (id) =>{
    await deletePost({ variables: { _id: id }})
    refetchPosts()
  }

  return (
    <div className="card card-body mb-3">
      <Button color="danger" className="delete-btn" onClick={onDeleteClick.bind(this, _id)}>X</Button>
      <Modal
        className="center-modal"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Update Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit.bind(this, _id)}>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input type="text" name="subject" id="subject" placeholder="Add Subject..." defaultValue={subject}
                onChange={onChange}/>

              <Label for="content">Content</Label>
              <Input type="textarea" name="content" id="content" placeholder="Add content..." defaultValue={content}
                onChange={onChange}/>
                
              <Button color="dark" style={{ marginTop: '2rem' }} block> Update Post</Button>
              
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      
      <div className="row">
        <div className="col-md-9">
          <h4>Subject: <span className='text-success'>
            {subject}
            </span>
          </h4>
          <p>Content: {content}</p>
        </div>
        <div className="col-md-3">
          <Link to={`/posts/post/${_id}`} className="btn btn-secondary">Post Details</Link>
          <Button color="info" onClick={toggle}>Update Post</Button>
        </div>
      </div>
    </div>
  )
}

export default PostItem
