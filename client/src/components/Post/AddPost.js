import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../../schemas/Post';

import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

const AddPost = ({refetchPosts}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [newPost, setNewPost] = useState({
    subject: '',
    content: ''
  });

  const [addPost] = useMutation(ADD_POST);

  const onChange = e => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await addPost({ variables: { subject: newPost.subject, content: newPost.content  } }); 
    refetchPosts()
  }

  return (
    <div>
      <div style={{textAlign:"center"}}>
        <Button onClick={toggle}>Add post</Button>
      </div>
      <Modal
        style={{position: "relative",
          top: "50%",
          transform: "translateY(-50%)"
        }}
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input type="text" name="subject" id="subject" placeholder="Add Subject..." 
                onChange={onChange}/>

              <Label for="content">Content</Label>
              <Input type="textarea" name="content" id="content" placeholder="Add content..."
                onChange={onChange}/>

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddPost
